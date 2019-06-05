-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 05 Juin 2019 à 06:56
-- Version du serveur :  5.7.11
-- Version de PHP :  7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `demomotdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `card`
--


DROP USER IF EXISTS 'demomotuser'@'localhost';
CREATE USER IF NOT EXISTS 'demomotuser'@'locahost';
CREATE USER IF NOT EXISTS 'demomotuser'@'localhost' IDENTIFIED BY "jL6H922e7u2zt3sMDHKa";
GRANT USAGE ON *.* TO 'demotmotdb'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT SELECT, INSERT, UPDATE, DELETE ON `demomotdb`.* TO 'demomotuser'@'localhost';

DROP DATABASE IF EXISTS demomotdb;
CREATE DATABASE IF NOT EXISTS demomotdb;
USE demomotdb;
CREATE TABLE `card` (
  `idCard` int(11) NOT NULL,
  `carTitle` varchar(255) NOT NULL,
  `carContent` varchar(512) NOT NULL,
  `carDesc` varchar(255) NOT NULL,
  `carMetrique` int(11) NOT NULL,
  `creDate` date NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `card`
--

INSERT INTO `card` (`idCard`, `carTitle`, `carContent`, `carDesc`, `carMetrique`, `creDate`, `idUser`) VALUES
(1, 'Trump power !', 'Trump decided to allow on every american people a drug that inprove strengt and intelligence !', 'Trump made an error ?!', 3, '2019-06-05', 1);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `idTag` int(11) NOT NULL,
  `tagName` char(122) NOT NULL,
  `tagColor` char(50) NOT NULL,
  `idCard` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `tag`
--

INSERT INTO `tag` (`idTag`, `tagName`, `tagColor`, `idCard`) VALUES
(1, 'Tag Test', '122.212.90', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
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
-- Contenu de la table `user`
--

INSERT INTO `user` (`idUser`, `useName`, `useSurname`, `useEmail`, `useLogin`, `usePassword`, `useImage`, `useDesc`) VALUES
(1, 'Lev?que', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'websi'),
(2, 'Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`idCard`),
  ADD KEY `Card_User_FK` (`idUser`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`idTag`),
  ADD KEY `Tag_Card_FK` (`idCard`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `card`
--
ALTER TABLE `card`
  MODIFY `idCard` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `idTag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `Card_User_FK` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `Tag_Card_FK` FOREIGN KEY (`idCard`) REFERENCES `card` (`idCard`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
