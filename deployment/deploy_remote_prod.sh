DOCKER_REGISTRY="282428440465.dkr.ecr.us-east-1.amazonaws.com"

aws ecr get-login-password | docker login --username AWS --password-stdin $DOCKER_REGISTRY
docker-compose -f production.yml build
docker-compose -f production.yml push
