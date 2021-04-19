#!/bin/bash

docker-compose -f "$PWD/production.yml" up --build -d
docker-compose -f "$PWD/production.yml" run --rm django python /app/manage.py migrate
docker-compose -f "$PWD/production.yml" run --rm django python /app/manage.py loaddata superuser
docker-compose -f "$PWD/production.yml" run --rm django python /app/manage.py loaddata tags
docker-compose -f "$PWD/production.yml" run --rm django python /app/manage.py loaddata writings
