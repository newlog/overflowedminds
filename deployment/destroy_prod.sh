#!/bin/bash

if [ "$1" == "--destroy-volumes" ]; then
  docker-compose -f production.yml down --rmi all -v
else
  docker-compose -f production.yml down --rmi all
fi

#docker-compose -f production.yml down --rmi all -v --remove-orphans
#docker rm -f $(docker ps -a -q)
#docker volume rm $(docker volume ls -q)
