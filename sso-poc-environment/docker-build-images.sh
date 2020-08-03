#!/usr/bin/env bash

rootDir=$(pwd)

echo 'Building images for sso-client'
cd $rootDir/sso-client && $rootDir/sso-client/docker-build-images.sh

echo 'Building images for sso-login-server'
cd $rootDir/sso-login-server && $rootDir/sso-login-server/docker-build-images.sh

echo 'Building images for sso-oidc-server'
cd $rootDir/sso-oidc-server && $rootDir/sso-oidc-server/docker-build-images.sh
