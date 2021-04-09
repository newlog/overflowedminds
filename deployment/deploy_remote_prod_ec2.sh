#!/bin/bash

rsync -av -e "ssh -i /Users/attackiq/Documents/code/keys/overflowedminds_ec2.pem" --exclude 'frontend/.git' --exclude 'frontend/.idea' --exclude 'frontend/node_modules' --exclude 'frontend/build' /Users/attackiq/Documents/code/overflowedminds ubuntu@52.45.26.126:~/
ssh -i /Users/attackiq/Documents/code/keys/overflowedminds_ec2.pem ubuntu@52.45.26.126 'cd /home/ubuntu/overflowedminds && /home/ubuntu/overflowedminds/deployment/prod_initial_launch.sh'
