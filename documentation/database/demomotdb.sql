#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

DROP USER IF EXISTS 'demomotuser'@'localhost';
CREATE USER IF NOT EXISTS 'demomotuser'@'locahost';
CREATE USER IF NOT EXISTS 'demomotuser'@'localhost' IDENTIFIED BY "jL6H922e7u2zt3sMDHKa";
GRANT USAGE ON *.* TO 'demotmotdb'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT, INSERT, UPDATE, DELETE ON `demomotdb`.* TO 'demomotuser'@'localhost';

DROP DATABASE IF EXISTS demomotdb;
CREATE DATABASE IF NOT EXISTS demomotdb;
USE demomotdb;

#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE User(
        idUser      Int  Auto_increment  NOT NULL ,
        useName     Varchar (50) NOT NULL ,
        useSurname  Varchar (50) NOT NULL ,
        useEmail    Char (255) NOT NULL ,
        useLogin    Char (50) NOT NULL ,
        usePassword Char (255) NOT NULL ,
        useImage    Char (255) NOT NULL ,
        useDesc     Char (5) NOT NULL
	,CONSTRAINT User_PK PRIMARY KEY (idUser)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Card
#------------------------------------------------------------

CREATE TABLE Card(
        idCard      Int  Auto_increment  NOT NULL ,
        carTitle    Varchar (255) NOT NULL ,
        carContent  Varchar (512) NOT NULL ,
        carDesc     Varchar (255) NOT NULL ,
        carMetrique Int NOT NULL ,
        creDate     Date NOT NULL ,
        idUser      Int NOT NULL
	,CONSTRAINT Card_PK PRIMARY KEY (idCard)

	,CONSTRAINT Card_User_FK FOREIGN KEY (idUser) REFERENCES User(idUser)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Tag
#------------------------------------------------------------

CREATE TABLE Tag(
        idTag    Int  Auto_increment  NOT NULL ,
        tagName  Char (122) NOT NULL ,
        tagColor Char (50) NOT NULL ,
        idCard   Int NOT NULL
	,CONSTRAINT Tag_PK PRIMARY KEY (idTag)

	,CONSTRAINT Tag_Card_FK FOREIGN KEY (idCard) REFERENCES Card(idCard)
)ENGINE=InnoDB;
