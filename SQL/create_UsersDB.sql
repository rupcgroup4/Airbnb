create table UsersDB ( 
    email nvarchar(64) primary key,
	userName nvarchar(30),
	firstName nvarchar(30),
	lastName nvarchar(30),
	password nvarchar(30) not null,
	birthDate date check(birthDate < getDate()),
	userRegisteredSince date check(userRegisteredSince <= getDate())
)

