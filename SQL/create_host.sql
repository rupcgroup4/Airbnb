create table Hosts (
	email nvarchar(64) primary key(email) foreign key references UsersDB(email),
	hostSince date check(hostSince <= getdate()),
	location nvarchar(50),
	about nvarchar(MAX),
	responseTime varchar(20),
	responseRate varchar(20),
	isSuperHost bit,
	img nvarchar(256),
	isVerified bit
)