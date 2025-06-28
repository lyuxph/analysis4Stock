CREATE DATABASE analysis;
USE analysis;

CREATE TABLE stock_price (
    Ticker CHAR(255) NOT NULL,
    Date CHAR(255)
);

CREATE TABLE version (
    Version_Id CHAR(255) NOT NULL,
    PRIMARY KEY(Version_Id)
);

INSERT version(Version_Id)
VALUES ('1.0.1');
