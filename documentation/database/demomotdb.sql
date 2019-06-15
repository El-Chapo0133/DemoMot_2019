#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

#------------------------------------------------------------
#	 User
#------------------------------------------------------------
DROP USER IF EXISTS 'demomotuser'@'localhost';
CREATE USER IF NOT EXISTS 'demomotuser'@'locahost';
CREATE USER IF NOT EXISTS 'demomotuser'@'localhost' IDENTIFIED BY "jL6H922e7u2zt3sMDHKa";
GRANT USAGE ON *.* TO 'demotmotdb'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT, INSERT, UPDATE, DELETE ON `demomotdb`.* TO 'demomotuser'@'localhost';
#------------------------------------------------------------
#	 Database
#------------------------------------------------------------
DROP DATABASE IF EXISTS demomotdb;
CREATE DATABASE IF NOT EXISTS demomotdb;
USE demomotdb;

#------------------------------------------------------------
# Table: t_User
#------------------------------------------------------------

CREATE TABLE t_User(
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
# Table: t_Card
#------------------------------------------------------------

CREATE TABLE t_Card(
        idCard      Int  Auto_increment  NOT NULL ,
        carTitle    Varchar (255) NOT NULL ,
        carContent  Varchar (512) NOT NULL ,
        carDesc     Varchar (255) NOT NULL ,
        carMetrique Int NOT NULL ,
        creDate     Date NOT NULL ,
        fkUser      Int NOT NULL
	,CONSTRAINT Card_PK PRIMARY KEY (idCard)

	,CONSTRAINT Card_User_FK FOREIGN KEY (fkUser) REFERENCES t_User(idUser) ON DELETE CASCADE
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_Tag
#------------------------------------------------------------

CREATE TABLE t_Tag(
        idTag    Int  Auto_increment  NOT NULL ,
        tagName  Char (122) NOT NULL ,
        tagColor Char (50) NOT NULL ,
        fkCard   Int NOT NULL
	,CONSTRAINT Tag_PK PRIMARY KEY (idTag)

	,CONSTRAINT Tag_Card_FK FOREIGN KEY (fkCard) REFERENCES t_Card(idCard) ON DELETE CASCADE
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_Comment
#------------------------------------------------------------

CREATE TABLE t_Comment(
        idComment  Int  Auto_increment  NOT NULL ,
        comName    Varchar (255) NOT NULL ,
        CreateDate Date NOT NULL ,
        fkUser     Int NOT NULL ,
        fkCard     Int NOT NULL
	,CONSTRAINT t_Comment_PK PRIMARY KEY (idComment)

	,CONSTRAINT t_Comment_User_FK FOREIGN KEY (fkUser) REFERENCES t_User(idUser) ON DELETE CASCADE
	,CONSTRAINT t_Comment_Card0_FK FOREIGN KEY (fkCard) REFERENCES t_Card(idCard) ON DELETE CASCADE
)ENGINE=InnoDB;