
#!/bin/bash

# Check if Docker Hub username is provided as argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 DOCKERHUB_USERNAME"
    exit 1
fi

# Tag Docker images with Docker Hub username
sudo docker tag backendspring-flask-app $1/backendspring-flask-app
sudo docker tag backendspring-react-app $1/backendspring-react-app
sudo docker tag backendspring-spring-app $1/backendspring-spring-app
sudo docker tag cassandra:latest $1/cassandra:latest

