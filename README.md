# AirInsight

AirInsight is a web application that provides real-time and historical
data on air quality metrics and environmental health. Users can
visualize air quality indices, pollutant concentrations, and trends
across different regions through interactive maps and charts.

## Key Features:

-   Real-time air quality data visualization
-   Interactive maps highlighting pollution hotspots
-   Educational resources on environmental health

## Technologies Used:

-   Node.js
-   Express.js
-   HTML
-   CSS
-   JavaScript

------------------------------------------------------------------------

## How to Use This Dockerized Container

### Prerequisites

-   Ensure you have Docker installed on your machine. You can download
    and install Docker from
    [here](https://www.docker.com/products/docker-desktop).

------------------------------------------------------------------------

### Steps to Pull and Run the Docker Container

1.  **Pull the Docker Image**:\
    Pull the Docker image from Docker Hub using the following command:

    ```
     docker pull denyme24/airinsight-nodejs
    ```

2.  **Running the Docker Container**\
    Start a container from the pulled image using the command:

    ```
    docker run -d --name airinsight-container -p 3000:3000
    denyme24/airinsight-nodejs 
    ```

3.  **Accessing the AirInsight Application**\
    After starting the Docker container, open a web browser and navigate
    to:
     ``` http://localhost:3000 ```
    This will take you to the AirInsight web application interface.

------------------------------------------------------------------------

  ## Available Endpoints

   Here are the key endpoints provided by the AirInsight application:

-   **GET /**: Serve the main web interface.
-   **GET /prediction**: Serve the prediction page.
-   **GET /about**: Serve the about page.
-   **POST /assistance**: Receive AI-generated responses based on user
    input.

------------------------------------------------------------------------

### Example Usage

To test the **/assistance** endpoint, you can use a tool like \`curl\`.
Here's an example:

```
bash curl -X POST http://localhost:3000/assistance\
-H "Content-Type: application/json"\
-d '{"message": "Hello, AI!"}' 
```

------------------------------------------------------------------------

## Checking Docker Container Logs (Optional)

If you want to view the logs of the running container, you can do so
with the following command:

```
bash docker logs airinsight-container
````

------------------------------------------------------------------------

## Stopping and Removing the Docker Container

If you need to stop and remove the container, you can use the following
commands:

### Step 1: Stop the Container

To stop the container:

```
bash docker stop airinsight-container
```

### Step 2: Remove the Container

After stopping the container, you can remove it with the following
command:

```
bash docker rm airinsight-container
```
