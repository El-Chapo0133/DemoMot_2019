USE demomotdb;

# TABLE CARD
INSERT INTO `t_card` (`idCard`, `carTitle`, `carContent`, `carDesc`, `carMetrique`, `creDate`, `fkUser`) VALUES
(1, 'Trump power !', 'Trump decided to allow on every american people a drug that inprove strengt and intelligence !', 'Trump made an error ?!', 3, '2019-06-05', 1),
(2, 'Faire le DemoMot', 'Cr?er l\'application qui me permettra de mieux m\'organiser semblable ? Trello :)', 'Cr?er une application d\'organisation', 1, '2019-06-06', 1),
(3, 'Finaliser la database', 'Pour pouvoir utiliser cette application, il me faut une base de donn?e fonctionnelle :D', 'Cr?ation de la database', 3, '2019-06-06', 1);


# TABLE USER
INSERT INTO t_User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Levêque', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'website creator :D');
INSERT INTO t_User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best prof ever!');

# TABLE TAG
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test', '122.212.90', 1);
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test 2', '12.12.190', 2);
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test 2.2', '122.121.121', 2);