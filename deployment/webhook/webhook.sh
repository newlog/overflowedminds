#!/bin/bash

source ~/.envs/.production/.webhook
webhook -hooks /home/ubuntu/webhooks/hooks.json -hotreload -verbose -port 29299 -template