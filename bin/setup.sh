#!/bin/bash
# setup.sh
# @ param = api_server_url

echo "==========================================="
echo "0. Stop nginx"
echo "==========================================="
sudo systemctl stop nginx

echo "==========================================="
echo "1. Install Dependency"
echo "==========================================="
sudo apt-get update
sudo apt-get install nginx git npm -y


echo "==========================================="
echo "2. Node Update"
echo "==========================================="
if [ -d ~/.nvm ]
  then
    echo "### nvm is already installed ###"
  else {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
  }
fi
nvm install v16
echo "***  Node Version ***"
node --version


echo "==========================================="
echo "3. Repository check, Git pull"
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
echo "4. Nginx Configuration"
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
echo "5. React env configuration"
echo "==========================================="
cd ~/team1-imageboard-front/
[ -f .env ] && rm .env
sudo echo REACT_APP_HTTP_URL=$1 >> .env
echo "*** team1-imageboard-front/.env ***"
sudo cat .env


echo "==========================================="
echo "6. Build"
echo "==========================================="
cd ~/team1-imageboard-front
[ -d build ] && rm -rf build
echo "*** log with : npm cache ***"
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
echo "7. Nginx restart"
echo "==========================================="
sudo systemctl start nginx
