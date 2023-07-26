CREATE DATABASE analysis;
USE analysis;

CREATE TABLE version (
    Version_Id CHAR(255) NOT NULL,
    PRIMARY KEY(Version_Id)
);
INSERT version(Version_Id)
VALUES ('1.3');

