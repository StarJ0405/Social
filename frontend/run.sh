#!/bin/bash

LOG=/home/ubuntu/social/data/api/front.log

echo "FRONT started."

nohup npm run start > $LOG 2>&1 &