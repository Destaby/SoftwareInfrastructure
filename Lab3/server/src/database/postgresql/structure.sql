CREATE TABLE groups (
  Id        varchar(36),
  Name      varchar(64) NOT NULL UNIQUE
);

ALTER TABLE groups ADD CONSTRAINT pkGroup PRIMARY KEY (Id);
