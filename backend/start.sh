#!/bin/sh

echo "run db migration"
flask db init
flask db upgrade

echo "start the app"
exec "$@"