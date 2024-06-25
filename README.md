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
docker exec <id_or_name_of_container> npm run vr-test
```
You can also run `npm run vr-test` from within the container.
Once the tests have been run, you can see a summary at `src/summary/index.html`.

## Approving references
Once you have run the tests as shown in the section above and looked at the summary, you can overwrite references for tests that need to be updated by following the instructions in the summary, or using the instructions below.

### To overwrite a single file in the references with a specific test image
Example: You want to update the test "Localhost - About Page - Tablet (Landscape)" reference by overwriting it with the test image. To do so, you would locate the file name in `src/summary/testImages` you want to copy to `src/summary/referenceImages` and then run the following command (using `localhost_-_about_page_-_tablet_landscape.png` as an example).
```
docker exec <id_or_name_of_docker_container> npm run vr-approve -- localhost_-_about_page_-_tablet_landscape.png
```
These instructions can also be found on the summary with easy to copy commands for every test.

### To overwrite all reference images with the test images
If all the tests are failing in a uniform way and you need to update the references to reflect the test images, you can run the following command:
```
docker exec <id_or_name_of_docker_container> npm run vr-approve -- --all
```
This command is also found on the summary at the top of the report.

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
