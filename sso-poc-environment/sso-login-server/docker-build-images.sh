#!/usr/bin/env bash

echo 'Building maven project for sso-login-server'
mvn clean install

echo 'Building images...'
docker build -t sso-login-server:latest .
