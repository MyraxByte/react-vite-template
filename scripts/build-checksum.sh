echo 'Creating build.json...'

echo '{
  "checksum": "'$(git rev-parse HEAD)'",
  "time": "'$(date +%s000)'",
  "date": "'$(date -u +"%Y.%m.%d-%H%M")'",
  "version": "'$(node -p "require('./package.json').version")'"
}' >./build.json

# copy to public folder
cp ./build.json ./public/build.json

# add to git
git add ./build.json
git add ./public/build.json

echo 'build.json created and added to staging.'
