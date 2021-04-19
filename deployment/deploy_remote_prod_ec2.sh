#!/bin/bash

rsync -av -e "ssh -i ~/Documents/code/keys/overflowedminds_ec2.pem" --exclude '.git' --exclude 'frontend/node_modules' --exclude 'frontend/build' "$PWD" ubuntu@52.45.26.126:~/
ssh -i ~/Documents/code/keys/overflowedminds_ec2.pem ubuntu@52.45.26.126 'cd ~/overflowedminds && ./deployment/prod_initial_launch.sh'
