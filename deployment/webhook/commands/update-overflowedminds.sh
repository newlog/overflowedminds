#!/bin/bash

echo "Upgrading overflowedminds..."

if [ ! -f ~/.envs/.production/.aws ]; then
    echo "File with AWS environment variables not found"
    exit 1
fi

if [ ! -f ~/.envs/.production/.github ]; then
    echo "File with Github environment variables not found"
    exit 1
fi

source ~/.envs/.production/.aws
source ~/.envs/.production/.github

DOCKER_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password | docker login --username AWS --password-stdin $DOCKER_REGISTRY

docker pull $DOCKER_REGISTRY/overflowedminds_production_django:latest
docker pull $DOCKER_REGISTRY/overflowedminds_production_frontend:latest
docker pull $DOCKER_REGISTRY/overflowedminds_production_postgres:latest
docker pull $DOCKER_REGISTRY/overflowedminds_production_traefik:latest
docker pull redis:5.0

docker rm -f `docker ps -aqf "name=^overflowedminds_django"` 2>/dev/null
docker rm -f `docker ps -aqf "name=^overflowedminds_frontend"` 2>/dev/null
docker rm -f `docker ps -aqf "name=^overflowedminds_postgres"` 2>/dev/null
docker rm -f `docker ps -aqf "name=^overflowedminds_traefik"` 2>/dev/null
docker rm -f `docker ps -aqf "name=^overflowedminds_redis"` 2>/dev/null

mkdir -p "${PWD}/overflowedminds/backend/.envs/.production"
mkdir -p "${PWD}/overflowedminds/frontend/.envs/.production"

rm "${PWD}/overflowedminds/production.yml.bak"
mv "${PWD}/overflowedminds/production.yml" "${PWD}/overflowedminds/production.yml.bak"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds" "production.yml" "${PWD}/overflowedminds/production.yml"
rm "${PWD}/overflowedminds/backend/.envs/.production/.django.bak"
mv "${PWD}/overflowedminds/backend/.envs/.production/.django" "${PWD}/overflowedminds/backend/.envs/.production/.django.bak"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.django" "${PWD}/overflowedminds/backend/.envs/.production/.django"
rm "${PWD}/overflowedminds/backend/.envs/.production/.postgres.bak"
mv "${PWD}/overflowedminds/backend/.envs/.production/.postgres" "${PWD}/overflowedminds/backend/.envs/.production/.postgres.bak"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.postgres" "${PWD}/overflowedminds/backend/.envs/.production/.postgres"
rm "${PWD}/overflowedminds/backend/.envs/.production/.traefik.bak"
mv "${PWD}/overflowedminds/backend/.envs/.production/.traefik" "${PWD}/overflowedminds/backend/.envs/.production/.traefik.bak"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.traefik" "${PWD}/overflowedminds/backend/.envs/.production/.traefik"
rm "${PWD}/overflowedminds/frontend/.envs/.production/.react"
mv "${PWD}/overflowedminds/frontend/.envs/.production/.react" "${PWD}/overflowedminds/frontend/.envs/.production/.react.bak"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "frontend/.envs/.production/.react" "${PWD}/overflowedminds/frontend/.envs/.production/.react"

docker-compose -f "${PWD}/production.yml" run --rm django python manage.py migrate
docker-compose -f "${PWD}/overflowedminds/production.yml" up -d