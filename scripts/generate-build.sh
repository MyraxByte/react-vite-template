echo 'Creating build.json...'
echo '{
  "checksum": "'$(git rev-parse HEAD)'",
  "time": "'$(date +%s000)'",
  "version": "v'$(node -p "require('./package.json').version")'"
}' > public/build.json

git add public/build.json

echo 'build.json created and added to staging.'