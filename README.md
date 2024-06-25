# Visual Regression Testing Example

## Prerequisites
You will need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
You will need to copy `.env.example` to `.env`. Please see the `Dockerfile` and `docker-compose.yml` files for more information on how those settings are used.

## To bring up the container (must be done before running test suite)
While in the directory for this repository, run the following command:
```
docker compose up -d
```

## To run the test suite
After bringing up the container, you can run the regression suite using the following command:
```
docker ps # Will list the docker containers; grab the name or id
docker exec <id_or_name_of_container> npm run test
```
You can also run `npm run test` from within the container

## To add more test scenarios
Open `src/config.js` and add another entry to the `testScenarios` array with the following:
```
{
    description: "Description of the test - Used for reference filename",
    viewports: [...viewports], // See src/modules/viewports.js for more options
    url: 'http://localhost:8080',
    waitForElements: ['#main-header'],
},
```

## To bring down the container
While in the directory for this repository, run the following command:
```
docker compose down
```

## To log into container to troubleshoot
```
docker ps # Will list the docker containers; grab the name or id
docker exec -it <id_or_name_of_container> bash
```
