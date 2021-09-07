# Booster

## Run without installing
prerequisites: docker, no processes listening on ports 4200, 3333 or 5432

To run production images, from the __DockerHub__ repository, locally you need to have docker installed. Run the following command and wait for database to initialize. It takes some time the first time to run it because it needs to load all the vehicle types.
```
docker-compose up
```

## Dev environment
prerequisites: docker, node, no processes listening on ports 4200, 3333 or 5432

- ```npm install``` - installs dependencies
- ```npm run local-dev``` - starts local database with docker-compose
- in one terminal run ```npm run backend:servve```
- in another terminal run ```npm run frontend:serve```

# Project structure
This project was generated using [Nx](https://nx.dev). The reason for this is that it makes it easy to bootstrap multiple applications as well as sharing code between backend and frontend. The project consists of two apps: __backend__ and __frontend__ as well as a shared library __models__ which is used for sharing interfaces between __backend__ and __frontend__.

## frontend
A basic Angular application with one route for ___vehicle-type-list___. VehicleTypeModule is lazy loaded - it is the only route so it makes no difference, but if we wanted to add more routes, this is the structure we would use.

Every componenet has its own SCAM module because it makes component dependencies more explicit and down the road, when Angular removes the need for modules, we can easily transition.

No store (NgRx, Akita) was used because we wouldn't gain anything in such a small app.

Angular Material is used for form controls, dialog, table and snackbar because it's widely used, is easy to use and looks decent without the need for custom styles. __MatSnackbar__ was wrapped into __NotificationService__ to unify the styling of notifications and to make it easier to replace __MatSnackbar__ in the future if needed.

Reactive forms are used for both search and create dialog because they easier to use, especially for reactive code (search).

## backend
A basic NestJS application with only one controller (vehicle-type).

__PostgreSQL__ is used for data persistence which is generally great for CRUD style applications, but it lacks in search capabilities. __Lucene__ / __Elasticsearch__ would be more appropriate for implementing fuzzy search, but it wouldn't make sense for such a small project.

__VehicleTypeEntity__ represents __vehicle_type__ table in the database. __id__ column is used as a primary key because it makes it easier to define relationships between other tables, but since we needed to ensure that the combination __make__, __model__ and __year__ is unique, we use create a composite __UNIQUE__ constraint.

__TypeORM__ is used for accessing the database with a nice repository interface as well as for handling migrations.

__dotenv__ is used for passing in environment variables from __.env__ file so that there is no need to set them up in our local machine during development. In conjunction with that, we use __Zod__ for parsing / validating environment variables so that we get a crash (if needed) as soon as the application starts and not later during runtime.

__InitialDataService__ is used for loading initial vehicle types in development environment. This might not be the best solution because it is only ever used in development and only called once, but it eliminates the need for running additional scripts when cloning the repository for the first time.

__VehicleTypeController__ is a REST controller, but it lacks the update method as per specification. The controller uses __VehicleTypeService__ which encapsulates business logic (mainly the search functionality, because other methods are basically mapped to repository layer 1 to 1). It also serves the purpose of separating the __VehicleTypeEntity__ from DTOs __VehicleType__ and __VehicleTypeCreate__ which are used in the rest of the project.

Fuzzy search is implemented using __similarity__ function provided by __PostgreSQL__. Three separate conditions are used, each one of which checks similarity of __make__, __model__ and __year__ to the search term. As stated above, this is not ideal, but is faster than loading all the data and doing fuzzy search in the application layer, even though that approach could provide more relevant search results. The best solution would be to use specialized tools such as __Elasticsearch__.

## CI
A single workflow is implemented with __GitHub Actions__. This workflow only runs on master and is used to build and push docker images to the __DockerHub__ repository.

It looks complicated because the repository is monorepo and we have to ensure that only the applications that were changed since the previous run get built. This is accomplished with the use of __affected__ functionality provided by __nx__. __nx__ builds a dependency graph out of the source code so that it knows which applications and libraries depend on each other. Based on this dependency graph and git history, __nx__ can deduce which applications have been changed since the last run. In this way we avoid unnecessarily building applications and libraries, which saves us a lot of resources for larger projects.

For each application, the workflow run __lint__, __build__ and __build-image__, which are defined in project.jsons, but also push images to the __Dockerhub__. Credentials for the repository are saved as secrets in __GitHub__ repository.
