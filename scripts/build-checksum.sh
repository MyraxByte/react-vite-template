echo 'Creating app.json...'

echo '{
  "checksum": "'$(git rev-parse HEAD)'",
  "time": "'$(date +%s000)'",
  "date": "'$(date -u +"%Y.%m.%d-%H%M")'",
  "version": "'$(node -p "require('./package.json').version")'"
}' >./src/app.json

echo 'app.json created.'
