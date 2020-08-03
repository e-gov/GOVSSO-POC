FROM oryd/hydra:v1.5.1-alpine

USER root

RUN apk add --no-cache curl

ADD ./certs/sso-dev-root.pem ./certs/sso-dev-root.pem

RUN cat ./certs/sso-dev-root.pem >> /etc/ssl/certs/ca-certificates.crt

USER ory