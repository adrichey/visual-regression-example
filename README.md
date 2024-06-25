# Visual Regression Testing Example

## Prerequisites
You will need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
You will need to copy `.env.example` to `.env`. Please see the `Dockerfile` and `docker-compose.yml` files for more information on how those settings are used.

## To bring up the container and run the test suite
While in the directory for this repository, run the following command:
```
docker compose up
```
Press `ctrl + c` to kill the process and get back to the command line.

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

## To add more test scenarios
Open `src\config.js` and add another entry to the `testScenarios` array with the following:
```
{
    description: "Description of the test - Used for reference filename",
    viewports: [...viewports], // See src/modules/viewports.js for more options
    url: 'http://localhost:8080',
    waitForElements: ['#main-header'],
},
```