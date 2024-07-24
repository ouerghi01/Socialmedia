#!/bin/bash

# Define your Docker repository username
DOCKER_USERNAME="azizwerghi"

# Define the name of your Docker repository
REPOSITORY_NAME="automail-genius"

# Define the tag name you want to push
TAG_NAME="latest"

# Tag the local image with the desired tag name
sudo docker tag backendspring-flask-app $DOCKER_USERNAME/$REPOSITORY_NAME:$TAG_NAME
sudo docker tag backendspring-react-app $DOCKER_USERNAME/$REPOSITORY_NAME:$TAG_NAME
sudo docker tag backendspring-spring-app $DOCKER_USERNAME/$REPOSITORY_NAME:$TAG_NAME
sudo docker tag cassandra:latest $DOCKER_USERNAME/$REPOSITORY_NAME:$TAG_NAME

# Push the tagged image to Docker Hub
sudo docker push $DOCKER_USERNAME/$REPOSITORY_NAME:$TAG_NAME

