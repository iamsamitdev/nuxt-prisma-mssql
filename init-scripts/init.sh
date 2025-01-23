#!/bin/bash
# ให้สิทธิ์การรันไฟล์ shell script
chmod +x init-scripts/init.sh

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
sleep 30s

# Install mssql-tools
apt-get update
ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

# Add mssql-tools to PATH
export PATH="$PATH:/opt/mssql-tools/bin"

# Create database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'blognuxtprisma') BEGIN CREATE DATABASE blognuxtprisma END"

# Keep container running
tail -f /dev/null