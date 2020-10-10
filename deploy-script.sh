echo "---------- Starting Deployment of Self Reviewer on NUXT JS Frontend Script ----------"
echo "[+] Going to Root Directory"
cd ~/ || exit
echo "[+] cd floracasy-frontend"
cd floracasy-frontend/ || exit
echo "[+] Stashing Code"
git stash
echo "[+] Pulling latest code"
git pull --rebase
echo "[+] Running Yarn Install"
yarn install
echo "[+] Running Yarn Build"
yarn build
echo "[+] Running Symlink"
ln -s ./.nuxt/ ./production/current
echo "[+] Reloading pm2 Server"
pm2 reload Floracasy
echo "---------- Deployed ----------"
