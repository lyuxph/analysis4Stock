FROM openjdk:17
FROM maven:3-openjdk-17
WORKDIR /usr/src/analysis
COPY ./src ./src
COPY pom.xml .
RUN mvn -e clean package
ENTRYPOINT ["java", "-jar", "target/Analysis-0.0.1-SNAPSHOT.jar"]
