FROM adoptopenjdk/openjdk13-openj9:jdk-13.0.2_8_openj9-0.18.0-alpine-slim
COPY ./target/sso-client*.jar server.jar
COPY ./wait-for wait-for
EXPOSE 8443
CMD ["./wait-for", "sso-oidc-server:8443", "--timeout=60", "--", "java", "-Dspring.config.location=/etc/sso-client/", "-Djavax.net.ssl.trustStore=/etc/sso-client/sso-client-truststore.p12", "-Djavax.net.ssl.trustStorePassword=changeme", "-Djavax.net.ssl.trustStoreType=PKCS12", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-XX:+IdleTuningGcOnIdle", "-Xtune:virtualized", "-jar", "server.jar"]