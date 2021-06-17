set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  rsync -a --exclude={'/node_modules','/src','/public'} client/ travis@139.59.216.92:/home/david/friendly-link/client
  rsync -a server/ travis@139.59.216.92:/home/david/friendly-link/server
else
  echo "Not deploying, since the branch isn't master."
fi