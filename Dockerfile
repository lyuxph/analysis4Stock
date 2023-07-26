FROM openjdk:20
FROM maven:3-openjdk-17
WORKDIR /usr/src/analysis
COPY ./src ./src
COPY pom.xml .
RUN mvn clean package
ENTRYPOINT ["java", "-jar", "target/Analysis-0.0.1-SNAPSHOT.jar"]
