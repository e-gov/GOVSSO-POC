# [AEGUNUD]
# Nõuded evitus ja ehituskeskkonna jaoks

- Docker 19.03 (või uuem)
- docker-compose 1.25.4 (või uuem)
- openjdk 11.0.7 (või uuem)
- Apache Maven 3.6.0 (või uuem)
- Ligipääs avalikku võrku (Docker registrile ja Maven repositooriumitele)

# POC-i käivitamine kohalikus masinas (kiire näide)

POC keskkonna koodiga tuleb kaasa vaikimisi konfiguratsioon, mis võimaldab kohalikus masinas docker keskkonna käivitada ilma seadistust muutmata.
Sellisel juhul kasutatakse autentimisteenusena RIA arenduskeskkonnas paiknevat TARA serverit https://tara-<TARISTU>/ (ligipääs antud teenusele on ainult RIA sisevõrgust või üle VPN-i).

1. Lisa POC näiterakenduse usaldusahela juursertifikaat sirviku usaldatud sertifikaadi väljastajate nimekirja:
 [../certs/sso-dev-root.pem](../certs/sso-dev-root.pem)
2. Lisa kohaliku masina host faili järgmised kirjed, et vaikimisi seadistatavad sertifikaadid vastaks sirvikus valiidsetele DNS nimedele.
```
127.0.0.1 sso-oidc-server.<TARISTU>
127.0.0.1 sso-login-server.<TARISTU>
127.0.0.1 sso-client-1.<TARISTU>
127.0.0.1 sso-client-2.<TARISTU>
127.0.0.1 sso-oidc-server-db
```
3. Ehita kokku maven projektid ja docker konteinerid
```
./docker-build-images.sh
```
4. Käivita docker-compose keskkond
```
./docker-compose up -d
```
5. Konteinerite käivitamine võib võtta kuni paar minutit. Kui kõik serverid on initsialiseeritud peaks kohalikus masinas olema võimalik avada klientrakenduste url-id:
    - https://sso-client-1.<TARISTU>:8445/
    - https://sso-client-2.<TARISTU>:8446/

# Kataloogipuu struktuur

```
+-- setup                         [Klientrakenduste konfiguratsioon Hydra serveri jaoks]
+-- sso-client                    [Näidis klientrakenduse kood]
|   +-- config                    [Klientrakenduse konfiguratsioonifailid docker-compose keskkonnas evitamiseks]
|       +-- sso-client-*          [Näidisrakenduste konfiguratsioon iga paigaldatava rakenduse instantsi kohta]
|   +-- src                       [Klientrakenduse kood]
+-- sso-login-server              [Näidis Hydra login rakenduse kood]
|   +-- config                    [Login rakenduse konfiguratsioonifailid docker-compose keskkonnas evitamiseks]
|   +-- src                       [Login rakenduse kood]
+-- sso-oidc-server               [Näidis Hydra server]
|   +-- config                    [Hydra serveri konfiguratsioonifailid docker-compose keskkonnas evitamiseks]
|   +-- Dockerfile                [Hydra serveri docker konteineri ehitus/seadistusfail]
|   docker-compose.yml            [Näidis keskkonna evitusskript]
```

# Docker-compose keskkonna kirjeldus

POC keskkonna käivitamiseks kasutatakse docker-compose konteinerite orkestreerimise tööriista.
Keskkonna tehniline kirjeldus asub [docker-compose.yml](docker-compose.yml) failis.
Keskkond koosneb järgnevatest teenustest:

| Konteineri nimi                | Kirjeldus                                                                                                                                   |
|------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | 
| sso-oidc-server                | Hydra serveri konteiner. Konteiner baseerub ORY poolt avaldatud Hydra alpine Dockerfailil.                                                  |  
| sso-login-server               | POC-i jaoks arendatud TARA SSO makettrakendus. Implementeerib suhtlust TARA serveriga ja haldab TARA SSO maketi kasutajaliidese vaateid.    |
| sso-oidc-server-db             | Tühi PostgreSQL andmebaas Hydra serveri andmemudeli jaoks. Baas on eelduseks teiste konteinerite käivitamisele.                             |
| setup-sso-oidc-server-db       | Andmebaasi algseadistamise konteiner. Konteineri käivitamise järel algseadistatakse PostgreSQL andmebaas, peale mida konteiner suletakse.   |
| setup-sso-oidc-server-client-1 | Linuxi käsurea utiliidi CURL konteiner. Käivitamisel registreerib esimese klientrakenduse konfiguratsiooni Hydra administreerimise liideses |
| setup-sso-oidc-server-client-2 | Linuxi käsurea utiliidi CURL konteiner. Käivitamisel registreerib teise klientrakenduse konfiguratsiooni Hydra administreerimise liideses   |
| sso-client-1                   | Esimene näidis klientrakendus                                                                                                               |
| sso-client-2                   | Teine näidis klientrakendus                                                                                                                 |

# Rakenduste ja Docker konteinerite ehitamine

Enne docker-compose keskkonna käivitamist on tuleb java projektid ehitada käivitatavateks .jar failideks ning pakendada docker-i konteineritesse.

Ehitamise hõlbustamiseks tarvis on projekti juurkataloogi lisatud Linux-i käsurea skript, mis käivitab järjestikku kolme konteineri ehitamise:

```
./docker-build-images.sh
```

Skripti käivitamise järel ehitatakse ja paigaldatakse kohaliku masina docker-i registrisse kolm konteineri blanketti (image):
- sso-client
- sso-login-server
- sso-oidc-server

# Rakenduste seadistamine

Rakenduste seadistus antakse ette docker-compose keskkonna käivitamisel. Sõltuvalt rakendusest on tema konfiguratsioon kirjeldatud kas docker-compose faili sees või projekti alamkataloogis "config".

## POC keskkonna sertifikaatide usaldusahel

Kõikides POC-i teenustes peab rakendama andmeühenduste kaitsmist TLS protokolli abil. See on OIDC protokolli nõue ja hea turvapraktika.

POC keskkonna jaoks vajalike sertifikaatide usaldusahela koostamise näidis on toodud antud koodirepositooriumi [certs/README.md](../certs/README.md) failis. 

Juhend näitlikustab OpenSSL tööriista abil omaallkirjastatud juursertifikaadi tekitamise, kõikidele POC-i rakendustele võtmete genereerimise ning sertifikaatide allkirjastamise käsud. Avalikele veebiteenustele sertifikaatide väljastamine sõltub asutuse sisemistest praktikatest ja antud juhend on ainult usaldusahela tekitamise näitlikustamiseks.

## sso-oidc-server seadistamine (Hydra server)

Hydra serveri konteiner baseerub ORY poolt pakutaval docker-i konteineril. Antud konteiner võimaldab teenuse konfigureerimiseks kasutada virtuaalmasina keskkonna parameetreid (environment variable).

POC-is rakendati Hydra serveri konfigureerimiseks docker-compose faili environment parameetreid. Serveri konfiguratsiooni muutmiseks tuleb muudatused teha otse docker-compose.yml failis. Täielik Hydra teenuse konfiguratsiooni parameetrite kirjeldus on välja toodud ametlikus [toote dokumentatsioonis](https://www.ory.sh/hydra/docs/reference/configuration/). POC-is realiseeritud töövoo näitlikustamiseks piisab järgnevate parameetrite väärtustamisest.

| Parameetri nimi                | Kirjeldus                                                                                                          | Näidis |
|------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------|
| URLS_SELF_ISSUER               | Hydra OIDC serveri väljastatavate tõendite väljastaja tunnus (iss väite väärtus). | https://sso-oidc-server.<TARISTU>:8443 |
| URLS_CONSENT                   | sso-login-server teenuse autentimise volituste otspunkti aadress | https://sso-login-server.<TARISTU>:8444/consent/request |
| URLS_LOGIN                     | sso-login-server teenuse autentimise algatamise otspunkti aadress | https://sso-login-server.<TARISTU>:8444/login/request |
| URLS_LOGOUT                    | sso-login-server teenuse väljalogimise kinnituste otspunkti aadress | https://sso-login-server.<TARISTU>:8444/logout/request |
| URLS_POST_LOGOUT_REDIRECT      | sso-login-server väljalogimise järgne suunamise aadress | https://sso-login-server.<TARISTU>:8444/logout/redirect |
| TTL_ID_TOKEN                   | identsustõendi kehtivus minutites | 15m |
| TTL_AUTH_CODE                  | volituskoodi kehtivus | 5m |
| TTL_LOGIN_CONSENT_REQUEST      | kasutaja volituse küsimise maksimaalne viiteaeg (vahelehe kuvamisest kuni "Jätka seanssi" nupu vajutamiseni) | 5m |
| DSN                            | sso-oidc-server-db konteineris töötava PostgreSQL andmebaasi ühenduse parameetrid | postgres://hydra:secret@sso-oidc-server-db:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4 |
| SERVE_PUBLIC_HOST              | Hydra konteineri DNS nimi välisvõrgust | sso-oidc-server |
| SERVE_PUBLIC_PORT              | Hydra serveri OIDC autoriseerimise otspunkti port | 8443 |
| SERVE_ADMIN_PORT               | Hydra serveri administreerimise liidese otspunkti port. Selle pordi kaudu toimub sso-login-server ja Hydra vaheline otsesuhtlus | 4445 |
| SERVE_TLS_KEY_PATH             | Hydra serveri TLS privaatvõtme faili aadress sso-oidc-server konteineri sees. Lisatakse docker volüümiga. | /etc/sso-oidc-server/sso-oidc-server.key | 
| SERVE_TLS_CERT_PATH            | Hydra serveri TLS sertifikaadi faili aadress sso-oidc-server konteineri sees. Lisatakse docker volüümiga. | /etc/sso-oidc-server/sso-oidc-server.pem |

### Hydra serveri TLS sertifikaadid
Hydra serveri TLS sertifikaat ja privaatvõti laetakse docker-compose keskkonna käivitamisel [sso-oidc-server/config](sso-oidc-server/config) kataloogist.

### Hydra usaldatud TLS sertifikaatide konfigureerimine
Selleks, et Hydra server saaks saata taustakanali väljalogimise teavitusi klientrakendustele, on tarvis, et Hydra server usaldaks klientrakenduste serveri TLS sertifikaate.

sso-oidc-server konteiner baseerub golang:1.11.5-alpine docker konteineril. Antud konteinerisse paigaldatud Hydra rakendus kasutab usaldatud sertide allikana virtuaalmasina kohalikku võtmehoidlat.

Kui klientrakenduste sertifikaadid on omaallkirjastatud või ei ole väljastatud mõne rahvusvaheliselt usaldatud sertifitseerija poolt (näiteks LetsEncrypt), tuleb klientrakenduste sertifikaadid (või juursertifikaat) lisada sso-oidc-server masina /etc/ssl/certs/ca-certificates.crt faili. Kui on tarvis, et muudatus oleks permanentne, siis tuleb antud käsk sisestada [sso-oidc-server/Dockerfile](sso-oidc-server/Dockerfile) lisa RUN käsuga:

```
ADD ./certs/sso-dev-root.pem ./certs/sso-dev-root.pem
RUN cat ./certs/sso-dev-root.pem >> /etc/ssl/certs/ca-certificates.crt
```
POC koodis on vaikimisi lisatud [../certs/sso-dev-root.pem](../certs/sso-dev-root.pem) sertifikaat sso-oidc-server virtuaalmasina usaldusnimekirja.

## sso-login-server seadistamine

sso-login-server näol on tegemist tavapärase Spring Boot rakendusega. Rakenduse seadistamine käib läbi application.properties faili. Seadistuse failid asuvad [sso-login-server/config](sso-login-server/config) kataloogis. Seadistus lisatakse konteinerile docker-compose volüümina.

### application.properties faili parameetrid
| Parameetri nimi                 | Kirjeldus                                                      | Näidis |
|-------------------------------- | -------------------------------------------------------------- | -------|
| server.port                     | Määrab rakenduse pordi | 8444 |
| server.ssl.enabled              | Lülitab sisse veebiserveri TLS otspunkti | true |
| server.ssl.key-store-password   | TLS privaatvõtme konteineri parool | changeme |
| server.ssl.key-store            | TLS privaatvõtme konteineri asukoht Docker-i konteineris | file:/etc/sso-login-server/sso-login-server-keystore.p12 |
| server.ssl.key-store-type       | TLS privaatvõtme konteineri formaat | PKCS12 |
| sso.application.public-url      | sso-login-server rakenduse avalik URL. Kasutatakse tagasisuunamise URL-ide koostamiseks. | https://sso-login-server.<TARISTU>:8444/ |
| sso.hydra.public-url            | Hydra serveri avalik URL (serveri nimi ja port, millel töötab Hydra OIDC autoriseerimise otspunkt. Vt SERVE_PUBLIC_HOST ja SERVE_PUBLIC_PORT parameetrid sso-oidc-server konfiguratsioonis) | https://sso-oidc-server.<TARISTU>:8443 |
| sso.hydra.admin-api-url         | Hydra serveri administreerimise liidese URL ja port (Vt. SERVE_PUBLIC_HOST ja SERVE_ADMIN_PORT parameetrid sso-oidc-server teenuse konfiguratsioonis). Hydra admin liidese port ei pea olema kättesaadav avalikust veebist ja DNS nimi võib olla ka docker-compose keskkonna sisemise võrgu URL. | https://sso-oidc-server.<TARISTU>:4445 |
| sso.hydra.trust-store           | Usaldatud sertifikaatide hoidla. Peab sisaldama Hydra serveri sertifikaati. | file:/etc/sso-login-server/sso-login-server-truststore.p12 |
| sso.hydra.trust-store-password  | Usaldatud sertifikaatide hoidla parool. | changeme |
| sso.tara.client-id              | TARA SSO klientrakenduse tunnus TARA kliendibaasis | tarasso2 |
| sso.tara.client-secret          | TARA SSO klientrakenduse salasõna TARA kliendibaasis | secret |
| sso.tara.token-endpoint         | TARA tõendiväljastus otspunkti URL | https://tara-<TARISTU>/oidc/token |
| sso.tara.userinfo-endpoint      | TARA isikuandmete väljastuse otspunkti URL | https://tara-<TARISTU>/oidc/profile |
| sso.tara.jwks-uri               | TARA avaliku allkirjastamise võtme otspunkti URL | https://tara-<TARISTU>/oidc/jwks |
| sso.tara.authorization_endpoint | TARA autentimise otspunkti URL | https://tara-<TARISTU>/oidc/authorize |
| sso.tara.trust-store            | Usaldatud sertifikaatide hoidla faili asukoht TARA ühenduse jaoks. Peab sisaldama TARA serveri sertifikaati. | file:/etc/sso-login-server/tara_truststore.p12 |
| sso.tara.trust-store-password   | Usaldatud sertifikaatide hoidla faili parool TARA ühenduse jaoks | changeme |

## sso-client

sso-client rakenduse näol on tegemist tavapärase Spring Boot rakendusega. OIDC autentimise implementatsiooniks kasutatakse rakenduses Spring Security 5 teeki. Rakenduse seadistamine käib läbi application.properties faili. Seadistuse failid asuvad [sso-client/config](sso-client/config) kataloogis. Seadistus lisatakse konteinerile docker-compose volüümina.

sso-client rakendus paigaldatakse docker-compose keskkonda kahes instantsis. Mõlema instantsi konfiguratsioon on eraldi [sso-client/config](sso-client/config) alamkataloogides.

### application.properties faili parameetrid

| Parameetri nimi                 | Kirjeldus                                                      | Näidis |
|-------------------------------- | -------------------------------------------------------------- | -------|
| server.port                     | Määrab rakenduse pordi | 8445 |
| server.ssl.enabled              | Lülitab sisse veebiserveri TLS otspunkti | true |
| server.ssl.key-store-password   | TLS privaatvõtme konteineri parool | changeme |
| server.ssl.key-store            | TLS privaatvõtme konteineri asukoht Docker-i konteineris | /etc/sso-client/sso-client-keystore.p12 |
| server.ssl.key-store-type       | TLS privaatvõtme konteineri formaat | PKCS12 |
| server.ssl.trust-store-password | TLS usaldatud sertifikaatide konteineri parool | changeme |
| server.ssl.trust-store          | TLS usaldatud sertifikaatide konteineri asukoht Docker-i konteineris | /etc/sso-client/sso-client-truststore.p12 |
| server.ssl.trust-store-type     | TLS usaldatud sertifikaatide konteineri formaat | PKCS12 |
| sso.application.public-url      | sso-client rakenduse avalik URL. Kasutatakse tagasisuunamise URL-ide koostamiseks | https://sso-client-1.<TARISTU>:8445 |
| sso.application.favicon-name    | Võimaldab juhtida klientrakenduse väljanägemist. Võimalikud väärtused 'faviconA.png', 'faviconA.png'. | faviconA.png |
| spring.application.name         | Klientrakenduse nimetus. Võimaldab juhtida klientrakenduse väljanägemist. | Klientrakendus 1 |
| sso.application.acr-values      | Võimaldab määrata klientrakenduse poolt TARA SSO suunas tehtavate autentimispäringute minimaalset autentimise usaldustaset. | substantial |
| spring.security.oauth2.client.registration.tarasso.client-name              | Autentimisteenuse nimetus Spring Security registris. Kasutatakse Spring Security poolt automaatselt genereeritavas login vaates (näidisrakenduses ei kasutata) | Riigi autentimisteenus |
| spring.security.oauth2.client.registration.tarasso.client-id                | Klientrakenduse tunnus TARA SSO klilendibaasis. | sso-client-1 |
| spring.security.oauth2.client.registration.tarasso.client-secret            | Klientrakenduse salasõna TARA SSO kliendibaasis | secret |
| spring.security.oauth2.client.registration.tarasso.authorization-grant-type | Protokollikohane nõutav väärtus authorization_code | authorization_code |
| spring.security.oauth2.client.registration.tarasso.redirect-uri             | Spring Security mooduli autentimise tagasisuunamise URL-i koostamise muster. | {baseUrl}/login/oauth2/code/{registrationId} |
| spring.security.oauth2.client.registration.tarasso.scope                    | Klientrakenduse poolt tellitav autentimise skoop. Lubatud väärtus 'openid'. | openid |
| spring.security.oauth2.client.provider.tarasso.issuer-uri                   | TARA SSO tõendite väljastaja tunnus (iss väide) | https://sso-oidc-server.<TARISTU>:8443/ |

## Klientrakenduste registreerimine Hydras (sso-oidc-serveris)

Klientrakendused registreeritakse läbi Hydra administreerimise liidese (Vt. SERVE_ADMIN_PORT sso-oidc-server konfiguratsioonis). Registreerimine toimub REST päringute kaudu. Päringud käivitatakse docker-compose keskkonna käivitamisel. Selle tarvis on docker-compose.yml failis kirjeldatud kaks CURL käsurea utiliiti käivitavat konteinerit: setup-sso-oidc-server-client-1 ja setup-sso-oidc-server-client-2.

Antud konteinerid loevad [setup](setup) kataloogist klientrakenduste seadistuse ja registreerivad klientrakendused Hydra serveris. Täielik kliendi konfigureerimise päringu sisu on kirjeldatud [Hydra ametlikus dokumentatsioonis](https://www.ory.sh/hydra/docs/reference/api/#create-an-oauth-20-client). Näidis konfiguratsioonid kahe POC klientrakenduse näitel on toodud [setup](setup) kataloogis.
