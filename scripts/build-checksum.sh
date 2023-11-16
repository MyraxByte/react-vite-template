echo 'Creating app.json...'

echo '{
  "checksum": "'$(git rev-parse HEAD)'",
  "time": "'$(date +%s000)'",
  "date": "'$(date -u +"%Y.%m.%d-%H%M")'",
  "version": "'$(node -p "require('./package.json').version")'"
}' >./src/app.json

# copy to public folder
cp ./src/app.json ./public/build.json

# add to git
git add ./src/app.json
git add ./public/build.json

echo 'app.json created and added to staging.'
