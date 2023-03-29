CREATE SCHEMA IF NOT EXISTS docsdangit DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE docsdangit;

CREATE TABLE docentries (
	id varchar(255) primary key,
	searchcontent text,
	object JSON
);

CREATE FULLTEXT INDEX index_full ON docentries(searchcontent);
