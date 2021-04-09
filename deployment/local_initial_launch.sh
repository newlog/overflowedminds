#!/bin/bash

docker-compose -f "$PWD/local.yml" up -d
docker-compose -f "$PWD/local.yml" run --rm django python manage.py migrate
docker-compose -f "$PWD/local.yml" run --rm django python manage.py loaddata superuser
docker-compose -f "$PWD/local.yml" run --rm django python manage.py loaddata tags
docker-compose -f "$PWD/local.yml" run --rm django python manage.py loaddata writings