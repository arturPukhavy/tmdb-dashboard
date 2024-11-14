import { Component } from '@angular/core';
import { Movie } from '../../../core/models/movie-model/movie.model';
import { GamesService } from '../../../core/services/games.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-game.component.html',
  styleUrl: './movie-game.component.css'
})
export class MovieGameComponent {
  movie: Movie;
  userGuess: string = '';
  isCorrect: boolean = false;
  showResultWindow: boolean = false;
  score: number = 0;
  imageUrl: string = '';
  isGuessSubmitted: boolean = false;
  maxScore: number = 30; // Player wins after 30 correct guesses
  gameWon: boolean = false;
  hasAttempts = true;
  incorrectAttempts: number = 0; // Track the number of incorrect attempts
  maxAttempts: number = 3; // Maximum allowed incorrect attempts

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.fetchRandomMovie();
  }

  fetchRandomMovie() {
    this.gamesService.getRandomMovie().subscribe((actor) => {
      this.movie = actor;
      this.imageUrl = `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
      this.isGuessSubmitted = false; // Enable input for the next round
    });
  }

  submitGuess() {
    if (this.isGuessSubmitted || this.gameWon) return; // Prevent multiple submissions or guessing after win

    this.showResultWindow = true;
    this.isGuessSubmitted = true;

    // Fuzzy matching: Check if at least 70% of the name matches
    const guessIsCloseEnough = this.fuzzyMatch(this.userGuess, this.movie.title, 0.7);

    if (guessIsCloseEnough) {
      this.isCorrect = true;
      this.score += 1;

      // Check if the user has won
      if (this.score >= this.maxScore) {
        this.gameWon = true;
      }
    } else {
      this.isCorrect = false;
      this.incorrectAttempts++;

      // Reset game if maximum attempts are reached
      if (this.incorrectAttempts >= this.maxAttempts) {
        this.resetGame();
      }
    }

    this.userGuess = '';
  }

  resetGame() {
    this.hasAttempts = false;
    this.score = 0;
    this.incorrectAttempts = 0;
    this.gameWon = false; // Reset game won state
  }

  getNextMovie() {
    this.hasAttempts = true;
    if (this.gameWon) return; // Disable fetching a new movie after the game is won

    this.fetchRandomMovie();
    this.isCorrect = false;
    this.showResultWindow = false;
  }

  // Fuzzy matching function: returns true if the match is within the specified threshold
  fuzzyMatch(input: string, target: string, threshold: number): boolean {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedTarget = target.toLowerCase().trim();
    
    const inputLength = normalizedInput.length;
    const targetLength = normalizedTarget.length;
    
    // Calculate the number of matching characters
    let matches = 0;
    for (let i = 0; i < Math.min(inputLength, targetLength); i++) {
      if (normalizedInput[i] === normalizedTarget[i]) {
        matches++;
      }
    }
    
    // Calculate the match percentage
    const percentageMatch = matches / Math.max(inputLength, targetLength);
    return percentageMatch >= threshold;
  }
}

