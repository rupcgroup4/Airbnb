create table UsersDB ( 
    email nvarchar(64) primary key,
	firstName nvarchar(30) not null,
	lastName nvarchar(30) not null,
	password nvarchar(30) not null,
	birthDate date check(birthDate < getDate())
)