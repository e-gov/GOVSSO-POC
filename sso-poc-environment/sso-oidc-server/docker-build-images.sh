#!/usr/bin/env bash

echo 'Building images...'
docker build -t sso-oidc-server:latest .
