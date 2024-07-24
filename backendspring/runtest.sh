#!/bin/bash
mvn clean install
sudo docker compose up -d
#sudo docker stop $(sudo docker ps -aq)
#docker system prune -a