FROM jdk-11.0.8_10-alpine

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar","/app.jar"]
