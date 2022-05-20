create table UsersDB ( 
	id int identity(1,1) primary key,
	firstName varchar(30) not null,
	lastName varchar(30) not null,
	email varchar(64) not null unique,
	password varchar(30) not null,
	birthDate date check(birthDate < getDate())
)