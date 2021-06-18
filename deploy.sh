set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  echo "Deploying to droplpet"
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  rsync -a --exclude={'/node_modules','/src','/public'} client/ david@139.59.216.92:/home/david/demo/client
  rsync -a server/ david@139.59.216.92:/home/david/demo/server
else
  echo "Not deploying, since the branch isn't master."
fi