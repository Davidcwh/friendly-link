set -xe

if [ $TRAVIS_BRANCH == 'main' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  rsync -a --exclude={'/node_modules','/src','/public'} client/ david@139.59.216.92:/home/david/demo/client
  rsync -a server/ david@139.59.216.92:/home/david/demo/server

  ssh david@139.59.216.92 'pm2 restart all'
else
  echo "Not deploying, since the branch isn't master."
fi