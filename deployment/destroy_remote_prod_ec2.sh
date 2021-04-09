#!/bin/bash

if [ "$1" == "--destroy-volumes" ]; then
  ssh -i /Users/attackiq/Documents/code/keys/overflowedminds_ec2.pem ubuntu@52.45.26.126 'cd /home/ubuntu/overflowedminds && /home/ubuntu/overflowedminds/deployment/destroy_prod.sh --destroy-volumes'
else
  ssh -i /Users/attackiq/Documents/code/keys/overflowedminds_ec2.pem ubuntu@52.45.26.126 'cd /home/ubuntu/overflowedminds && /home/ubuntu/overflowedminds/deployment/destroy_prod.sh'
fi


