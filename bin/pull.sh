#!/bin/bash
# setup.sh
# @ param = api_server_url

echo "==========================================="
echo "0. Stop nginx"
echo "==========================================="
node --version
sudo systemctl stop nginx


echo "==========================================="
echo "1. Repository check, Git pull"
echo "==========================================="
cd ~
[ -d team1-imageboard-front ] || git clone https://github.com/BiBimBapXOpenStack/team1-imageboard-front.git 
git config --global user.email anjm1020@gmail.com
git config --global user.name jaemin
cd ~/team1-imageboard-front
rm -rf .git/index.lock
git fetch --all
git reset --hard origin/develop
git pull origin develop


echo "==========================================="
echo "2. Nginx Configuration"
echo "==========================================="
[ -f ~/../../etc/nginx/sites-available/default ] && sudo rm ~/../../etc/nginx/sites-available/default
[ -f ~/../../etc/nginx/sites-enabled/default ] && sudo rm ~/../../etc/nginx/sites-enabled/default
cd ~/team1-imageboard-front/bin/conf;
sudo sed -i 's@SERVER_URL@'"$1"'@g' imageboard.conf
[ -f ~/../../etc/nginx/sites-available/imageboard.conf ] && sudo rm ~/../../etc/nginx/sites-available/imageboard.conf
sudo cp imageboard.conf ~/../../etc/nginx/sites-available/imageboard.conf
echo "*** sites-available/imageboard.conf ***"
sudo cat ~/../../etc/nginx/sites-available/imageboard.conf
cd ~
[ -f ~/../../etc/nginx/sites-enabled/imageboard.conf ] && sudo rm ~/../../etc/nginx/sites-enabled/imageboard.conf
sudo ln -s /etc/nginx/sites-available/imageboard.conf /etc/nginx/sites-enabled/imageboard.conf
echo "*** sites-enabled/imageboard.conf ***"
sudo cat ~/../../etc/nginx/sites-enabled/imageboard.conf


echo "==========================================="
echo "3. React env configuration"
echo "==========================================="
cd ~/team1-imageboard-front/
[ -f .env ] && rm .env
sudo echo REACT_APP_HTTP_URL=$1 >> .env
echo "*** team1-imageboard-front/.env ***"
sudo cat .env


echo "==========================================="
echo "4. Build"
echo "==========================================="
node --version
cd ~/team1-imageboard-front
[ -d build ] && rm -rf build
[ -d node_modules ] && rm -rf node_modules
[ -f package-lock.json ] && rm -rf package-lock.json
echo "*** log with : npm install ***"
npm install
echo "*** log with : npm build ***"
npm run build
echo "*** team1-imageboard-front/build/ ***"
cd build/
ls


echo "==========================================="
echo "5. Nginx restart"
echo "==========================================="
sudo systemctl start nginx
