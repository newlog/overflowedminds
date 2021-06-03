#!/bin/bash

sleep 120s

DOCKER_REGISTRY="282428440465.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password | docker login --username AWS --password-stdin $DOCKER_REGISTRY

docker pull 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds_production_django:latest
docker pull 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds_production_frontend:latest
docker pull 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds_production_postgres:latest
docker pull 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds_production_traefik:latest
docker pull redis:5.0

docker rm -f `docker ps -aqf "name=^overflowedminds_django"`
docker rm -f `docker ps -aqf "name=^overflowedminds_frontend"`
docker rm -f `docker ps -aqf "name=^overflowedminds_postgres"`
docker rm -f `docker ps -aqf "name=^overflowedminds_traefik"`
docker rm -f `docker ps -aqf "name=^redis"`

# docker container rm -f $(docker container ls -aq)
docker compose -f production.yml up -d
