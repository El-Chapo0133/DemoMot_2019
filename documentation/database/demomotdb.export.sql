-- phpMyAdmin SQL Dump

-- version 4.5.4.1

-- http://www.phpmyadmin.net

--

-- Client :  localhost

-- Généré le :  Ven 07 Juin 2019 à 11:05

-- Version du serveur :  5.7.11

-- Version de PHP :  7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



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

--
-- Base de données :  `demomotdb`
--

-- 
--------------------------------------------------------

--
-- Structure de la table `t_card`
--

CREATE TABLE `t_card` (
  `idCard` int(11) NOT NULL,
  `carTitle` varchar(255) NOT NULL,
  `carContent` varchar(512) NOT NULL,
  `carDesc` varchar(255) NOT NULL,
  `carMetrique` int(11) NOT NULL,
  `creDate` date NOT NULL,
  `fkUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `t_card`
--

INSERT INTO `t_card` (`idCard`, `carTitle`, `carContent`, `carDesc`, `carMetrique`, `creDate`, `fkUser`) VALUES
(1, 'Trump power !', 'Trump decided to allow on every american people a drug that inprove strengt and intelligence !', 'Trump made an error ?!', 3, '2019-06-05', 1),
(2, 'Faire le DemoMot', 'Cr?er l\'application qui me permettra de mieux m\'organiser semblable ? Trello :)', 'Cr?er une application d\'organisation', 1, '2019-06-06', 1),
(3, 'Finaliser la database', 'Pour pouvoir utiliser cette application, il me faut une base de donn?e fonctionnelle :D', 'Cr?ation de la database', 3, '2019-06-06', 1);

-- --------------------------------------------------------

--
-- Structure de la table `t_comment`
--

CREATE TABLE `t_comment` (
  `idComment` int(11) NOT NULL,
  `comName` varchar(255) NOT NULL,
  `CreateDate` date NOT NULL,
  `fkUser` int(11) NOT NULL,
  `fkCard` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_tag`
--

CREATE TABLE `t_tag` (
  `idTag` int(11) NOT NULL,
  `tagName` char(122) NOT NULL,
  `tagColor` char(50) NOT NULL,
  `fkCard` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `t_tag`
--

INSERT INTO `t_tag` (`idTag`, `tagName`, `tagColor`, `fkCard`) VALUES
(1, 'Tag Test', '122.212.90', 1),
(2, 'Tag Test2', '12.22.190', 2);

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE `t_user` (
  `idUser` int(11) NOT NULL,
  `useName` varchar(50) NOT NULL,
  `useSurname` varchar(50) NOT NULL,
  `useEmail` char(255) NOT NULL,
  `useLogin` char(50) NOT NULL,
  `usePassword` char(255) NOT NULL,
  `useImage` char(255) NOT NULL,
  `useDesc` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `t_user`
--

INSERT INTO `t_user` (`idUser`, `useName`, `useSurname`, `useEmail`, `useLogin`, `usePassword`, `useImage`, `useDesc`) VALUES
(1, 'Lev?que', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'websi'),
(2, 'Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best'),
(3, 'Lev?que', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'websi'),
(4, 'Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best'),
(5, 'Lev?que', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'websi'),
(6, 'Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `t_card`
--
ALTER TABLE `t_card`
  ADD PRIMARY KEY (`idCard`),
  ADD KEY `Card_User_FK` (`fkUser`);

--
-- Index pour la table `t_comment`
--
ALTER TABLE `t_comment`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `t_Comment_User_FK` (`fkUser`),
  ADD KEY `t_Comment_Card0_FK` (`fkCard`);

--
-- Index pour la table `t_tag`
--
ALTER TABLE `t_tag`
  ADD PRIMARY KEY (`idTag`),
  ADD KEY `Tag_Card_FK` (`fkCard`);

--
-- Index pour la table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `t_card`
--
ALTER TABLE `t_card`
  MODIFY `idCard` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `t_comment`
--
ALTER TABLE `t_comment`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `t_tag`
--
ALTER TABLE `t_tag`
  MODIFY `idTag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `t_card`
--
ALTER TABLE `t_card`
  ADD CONSTRAINT `Card_User_FK` FOREIGN KEY (`fkUser`) REFERENCES `t_user` (`idUser`);

--
-- Contraintes pour la table `t_comment`
--
ALTER TABLE `t_comment`
  ADD CONSTRAINT `t_Comment_Card0_FK` FOREIGN KEY (`fkCard`) REFERENCES `t_card` (`idCard`),
  ADD CONSTRAINT `t_Comment_User_FK` FOREIGN KEY (`fkUser`) REFERENCES `t_user` (`idUser`);

--
-- Contraintes pour la table `t_tag`
--
ALTER TABLE `t_tag`
  ADD CONSTRAINT `Tag_Card_FK` FOREIGN KEY (`fkCard`) REFERENCES `t_card` (`idCard`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
