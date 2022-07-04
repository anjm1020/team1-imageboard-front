#!/bin/bash
# pull.sh

cd team1-imageboard-front
git pull origin develop
npm install
npm run build
sudo systemctl restart nginx