#!/bin/bash

echo "Upgrading overflowedminds..."

DOCKER_REGISTRY="282428440465.dkr.ecr.us-east-1.amazonaws.com"
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
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds" "production.yml" "${PWD}/overflowedminds/production.yml"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.django" "${PWD}/overflowedminds/backend/.envs/.production/.django"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.postgres" "${PWD}/overflowedminds/backend/.envs/.production/.postgres"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "backend/.envs/.production/.traefik" "${PWD}/overflowedminds/backend/.envs/.production/.traefik"
python3 "${PWD}/webhooks/commands/download_repo_file.py" "newlog" "overflowedminds-private" "frontend/.envs/.production/.react" "${PWD}/overflowedminds/frontend/.envs/.production/.react"

docker-compose -f "${PWD}/overflowedminds/production.yml" up -d