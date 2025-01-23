IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'blognuxtprisma')
BEGIN
    CREATE DATABASE blognuxtprisma;
END
GO