#!/bin/bash

# ให้สิทธิ์การรันไฟล์ shell script
chmod +x init-scripts/init-prisma.sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
until /opt/mssql-tools/bin/sqlcmd -S mssql -U sa -P YourStrong@Passw0rd -d blognuxtprisma -Q "SELECT 1" &> /dev/null
do
  echo "Database is not ready - sleeping"
  sleep 5
done

echo "Database is ready - running migrations"

# Run Prisma migrations
cd /app && npx prisma migrate deploy

# Start the application
exec node .output/server/index.mjs
