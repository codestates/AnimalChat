#!/bin/bash
cd /home/ubuntu/AnimalChat/server
sudo nohup node index.js &
disown %1
exit