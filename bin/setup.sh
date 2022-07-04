#!/bin/bash
# setup.sh
# @ param = api_server_url

# apt update, install dependency
sudo apt-get update
sudo apt-get install nginx git npm -y

# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install v16

# git clone
cd
git config --global user.email anjm1020@gmail.com
git config --global user.name jaemin
git clone https://github.com/BiBimBapXOpenStack/team1-imageboard-front.git
git fetch --all
git restore --hard origin/develop
git pull origin develop

# set nginx configuration
cd
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
cd
cd team1-imageboard-front/bin/conf;
sudo sed -i 's@SERVER_URL@'"$1"'@g' imageboard.conf
sudo cp imageboard.conf ~/../../etc/nginx/sites-available/default/imageboard.conf

# add symbolic link
sudo ln -s /etc/nginx/sites-available/imageboard.conf /etc/nginx/sites-enabled/imageboard.conf

# make .env file
cd
cd team1-imageboard-front
sudo echo REACT_APP_HTTP_URL=$1 >> .env

# build
cd team1-imageboard-front
npm install
npm run build

sudo systemctl restart nginx
