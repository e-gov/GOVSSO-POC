# TARA SSO POC-i serdiahela genereerimise juhend

Dokument kirjeldab näidis sertifikaadiahela genereerimist TARA SSO POC komponentidele. Genereeritakse iseallkirjastataud juursertifikaat ja selle alt väljastatakse sertifikaadid kõikide POC-i rakenduste URL-idele. URL muster on *rakenduse_nimi*.<TARISTU>.

## Genereeri TARA SSO login rakenduse usaldatud sertifikaatide hoidla (truststore)
```bash
keytool -import -v -trustcacerts -alias ci-root -file static/RIA ROOT CA 2018 G1.pem -keystore tara_truststore.jks
keytool -importkeystore -srckeystore tara_trststore.jks  -destkeystore tara_truststore.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass changeme
```

## TARA SSO rakenduste juursertifikadi genereerimine

```bash
openssl req -newkey rsa:2048 -nodes -keyout sso-dev-root.key -x509 -days 364 -out sso-dev-root.pem -subj "/C=EE/L=Tallinn/O=sso-dev/CN=sso-dev-root"
```

## sso-login-server rakendusele sertifikaadi väljastamine

```bash
openssl genrsa -out sso-login-server.key 2048
openssl req -new -sha256 -key sso-login-server.key -subj "/C=EE/L=Tallinn/O=sso-dev/CN=sso-login-server.<TARISTU>" -out sso-login-server.csr -config <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-login-server.<TARISTU>\nDNS.2=sso-login-server"))
openssl x509 -req -in sso-login-server.csr -CA sso-dev-root.pem -CAkey sso-dev-root.key -CAcreateserial -out sso-login-server.pem -days 363 -sha256 -extensions req_ext -extfile <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-login-server.<TARISTU>\nDNS.2=sso-login-server"))
```

## sso-oidc-server rakendusele sertifikaadi väljastamine

```bash
openssl genrsa -out sso-oidc-server.key 2048
openssl req -new -sha256 -key sso-oidc-server.key -subj "/C=EE/L=Tallinn/O=sso-dev/CN=sso-oidc-server.<TARISTU>" -out sso-oidc-server.csr -config <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-login-oidc.<TARISTU>\nDNS.2=sso-oidc-server"))
openssl x509 -req -in sso-oidc-server.csr -CA sso-dev-root.pem -CAkey sso-dev-root.key -CAcreateserial -out sso-oidc-server.pem -days 363 -sha256 -extensions req_ext -extfile <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-oidc-server.<TARISTU>\nDNS.2=sso-oidc-server"))
```

## sso-client-1 rakendusele sertifikaadi väljastamine

```bash
openssl genrsa -out sso-client-1.key 2048
openssl req -new -sha256 -key sso-client-1.key -subj "/C=EE/L=Tallinn/O=sso-dev/CN=sso-client-1.<TARISTU>" -out sso-client-1.csr -config <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-client-1.<TARISTU>\nDNS.2=sso-client-1"))
openssl x509 -req -in sso-client-1.csr -CA sso-dev-root.pem -CAkey sso-dev-root.key -CAcreateserial -out sso-client-1.pem -days 363 -sha256 -extensions req_ext -extfile <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-client-1.<TARISTU>\nDNS.2=sso-client-1"))
```

## sso-client-2 rakendusele sertifikaadi väljastamine

```bash
openssl genrsa -out sso-client-2.key 2048
openssl req -new -sha256 -key sso-client-2.key -subj "/C=EE/L=Tallinn/O=sso-dev/CN=sso-client-2.<TARISTU>" -out sso-client-2.csr -config <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-client-2.<TARISTU>\nDNS.2=sso-client-2"))
openssl x509 -req -in sso-client-2.csr -CA sso-dev-root.pem -CAkey sso-dev-root.key -CAcreateserial -out sso-client-2.pem -days 363 -sha256 -extensions req_ext -extfile <(cat openssl.cnf <(printf "\n[alt_names]\nDNS.1=sso-client-2.<TARISTU>\nDNS.2=sso-client-2"))
```

## Privaatvõtme hoidlate genereerimine

```bash
openssl pkcs12 -export -inkey sso-login-server.key  -in sso-login-server.pem -name sso-login-server -out sso-login-server-keystore.p12 -passout pass:changeme
openssl pkcs12 -export -inkey sso-oidc-server.key  -in sso-oidc-server.pem -name sso-oidc-server -out sso-oidc-server-keystore.p12 -passout pass:changeme
openssl pkcs12 -export -inkey sso-client-1.key  -in sso-client-1.pem -name sso-client-1 -out sso-client-1-keystore.p12 -passout pass:changeme
openssl pkcs12 -export -inkey sso-client-2.key  -in sso-client-2.pem -name sso-client-2 -out sso-client-2-keystore.p12 -passout pass:changeme
```

## Usaldatud avalike võtmete konteinerite genereerimine

```bash
keytool -import -v -trustcacerts -alias sso-oidc-server.<TARISTU> -file sso-oidc-server.pem -keystore sso-login-server-truststore.jks -storepass changeme
keytool -importkeystore -srckeystore sso-login-server-truststore.jks  -destkeystore sso-login-server-truststore.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass changeme -srcstorepass changeme
keytool -import -v -trustcacerts -alias sso-login-server.<TARISTU> -file sso-login-server.pem -keystore sso-oidc-server-truststore.jks -storepass changeme
keytool -import -v -trustcacerts -alias sso-client-1.<TARISTU> -file sso-client-1.pem -keystore sso-oidc-server-truststore.jks -storepass changeme
keytool -import -v -trustcacerts -alias sso-client-2.<TARISTU> -file sso-client-2.pem -keystore sso-oidc-server-truststore.jks -storepass changeme
keytool -importkeystore -srckeystore sso-oidc-server-truststore.jks  -destkeystore sso-oidc-server-truststore.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass changeme -srcstorepass changeme
keytool -import -v -trustcacerts -alias sso-oidc-server.<TARISTU> -file sso-oidc-server.pem -keystore sso-client-1-truststore.jks -storepass changeme
keytool -import -v -trustcacerts -alias sso-oidc-server.<TARISTU> -file sso-oidc-server.pem -keystore sso-client-2-truststore.jks -storepass changeme
keytool -importkeystore -srckeystore sso-client-1-truststore.jks  -destkeystore sso-client-1-truststore.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass changeme -srcstorepass changeme
keytool -importkeystore -srckeystore sso-client-2-truststore.jks  -destkeystore sso-client-2-truststore.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass changeme -srcstorepass changeme
```

## Cleanup
rm -rf sso-dev-root.srl sso-login-server-truststore.jks sso-oidc-server-truststore.jks sso-client-1-truststore.jks sso-client-2-truststore.jks