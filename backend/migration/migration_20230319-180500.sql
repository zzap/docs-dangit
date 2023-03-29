ALTER TABLE docentries DROP PRIMARY KEY;
ALTER TABLE docentries change id entryhash char(128) NOT NULL;
ALTER TABLE docentries ADD id int auto_increment PRIMARY KEY ;
