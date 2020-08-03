FROM adoptopenjdk/openjdk13-openj9:jdk-13.0.2_8_openj9-0.18.0-alpine-slim
COPY ./target/sso-login-server*.jar server.jar
EXPOSE 8443
CMD ["java", "-Dspring.config.location=/etc/sso-login-server/", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-XX:+IdleTuningGcOnIdle", "-Xtune:virtualized", "-jar", "server.jar"]