USE demomotdb;

# TABLE USER
INSERT INTO t_User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Levêque', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'website creator :D');
INSERT INTO t_User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best prof ever!');

# TABLE CARD
INSERT INTO t_Card (carTitle, carContent, carDesc, carMetrique, creDate, fkUser) VALUES ('Trump power !', 'Trump decided to allow on every american people a drug that inprove strengt and intelligence !', 'Trump made an error ?!', 3, '2019-06-05', 1);

# TABLE TAG
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test', '122.212.90', 1);
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test 2', '12.12.190', 2);
INSERT INTO t_Tag (tagName, tagColor, idCard) VALUES ('Tag Test 2.2', '122.121.121', 2);