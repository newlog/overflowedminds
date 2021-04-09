DOCKER_REGISTRY="282428440465.dkr.ecr.us-east-1.amazonaws.com"

aws ecr get-login-password --region us-east-1 | /bin/bash
# docker build -t overflowedminds-backend .
##docker tag overflowedminds-backend:latest 282428440465.dkr.ecr.us-east-1.amazonaws.com/overflowedminds-backend:latest
for r in $(grep "image: ${DOCKER_REGISTRY}" local.yml | sed -e 's/^.*\///')
do
    aws ecr create-repository --repository-name "$r"
done
docker-compose -f local.yml build
docker-compose -f local.yml push
