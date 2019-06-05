USE demomotdb;

# TABLE USER
INSERT INTO User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Levêque', 'Loris', 'levequelo@etml.educanet2.ch', 'El-Chapo', '.Etml-', '../ressources/images/loris.png', 'website creator :D');
INSERT INTO User (useName, useSurname, useEmail, useLogin, usePassword, useImage, useDesc) VALUES ('Delgado', 'Michel', 'delgadomi@etml.educanet2.ch', 'porofessor', 'qwertz', '../ressources/images/michel.png', 'best prof ever!');

# TABLE CARD
INSERT INTO Card (carTitle, carContent, carDesc, carMetrique, creDate, idUser) VALUES ('Trump power !', 'Trump decided to allow on every american people a drug that inprove strengt and intelligence !', 'Trump made an error ?!', 3, '2019-06-05', 1);

# TABLE TAG
INSERT INTO Tag (tagName, tagColor, idCard) VALUES ('Tag Test', '122.212.90', 1);