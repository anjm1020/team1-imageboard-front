#!/bin/bash
# pull.sh

cd
cd team1-imageboard-front
git fetch --all
git reset --hard origin/develop
git pull origin develop
npm install
npm run build
sudo systemctl restart nginx
