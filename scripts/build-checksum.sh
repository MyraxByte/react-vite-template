echo 'Creating app.json...'

echo '{
  "checksum": "'$(git rev-parse HEAD)'",
  "time": "'$(date +%s000)'",
  "date": "'$(date -u +"%Y.%m.%d-%H%M")'",
  "version": "'$(node -p "require('./package.json').version")'",
  "last_update": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "branch": "'$(git rev-parse --abbrev-ref HEAD)'"
}' >./src/app.json

echo 'app.json created and added to staging.'
