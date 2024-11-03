# TMDB dashboard
[![(CD) TMDB-dashboard - FE](https://github.com/arturPukhavy/tmdb-dashboard/actions/workflows/(CD)%20TMDB-dashboard%20-%20FE.yml/badge.svg)](https://github.com/arturPukhavy/tmdb-dashboard/actions/workflows/(CD)%20TMDB-dashboard%20-%20FE.yml)
This is a web application built using Angular (version 18.1.3) that serves as a demo (POC) project to explore frontend and CI/CD technologies. The application is currently deployed and running on the Glitch platform at https://tmdb-dashboard.glitch.me.

## Used Technologies
* FE: Angular (18.1.3)
* BE: TMDB API

#### Angular Features Used
* Standalone Components
* HTTP Client
* Interceptors
* Routing
* Observable
* Services
* Dependency injection
* Pipes
* Directives
* Models
## API
This product uses the TMDB API but is not endorsed or certified by TMDB. 

## CI/CD
**GitHib Actions** feature is used for CI/CD. <br>
CI is triggered each time a feature branch is updated, building the app and running tests.<br>
CD is triggered by any commit to the main branch, typically after merging a feature branch into main when completing pull requests. CD then deploys the frontend application to the Glitch platform.
### Development Server Proxy
Angular allows to configure CLI dev-server proxy. This is an example of `proxy.conf.json` configuration:
```
{
   "/api/v1/products": {
      "target": "http://localhost:3000",
      "secure": false
   }
}
```
Use the following command to run dev-proxy:
```
ng serve --proxy-config proxy.conf.json
```
This configuration is ONLY for a development purpose, it should not be used in a production environment.

## Resources
* [Angular docs](https://v17.angular.io/docs)
* [Typescript docs](https://www.typescriptlang.org/docs/)
* [Bootstrap](https://getbootstrap.com/docs/5.3/content/tables/)

