#!/usr/bin/env bash

echo 'Building maven project for sso-client...'
mvn clean install

echo 'Building images...'
docker build -t sso-client:latest .