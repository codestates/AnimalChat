#!/bin/bash
cd /home/ubuntu/AnimalChat/server

export DB_ID=$(aws ssm get-parameters --region ap-northeast-2 --names DB_ID --query Parameters[0].Value | sed 's/"//g')
export DB_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DB_NAME --query Parameters[0].Value | sed 's/"//g')
export DB_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PASSWORD --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js