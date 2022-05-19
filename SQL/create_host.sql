create table host (
	
	Id int identity(1,1) primary key,
	FirstName varchar(30) not null,
	LastName varchar(30) not null,
	Email varchar(30) not null,
	Password varchar(30) not null,
	BirthDate date,
	HostSince date,
	Location varchar(50),
	About varchar(256),
	ResponseTime varchar(20),
	ResponseRate varchar(20),
	IsSuperHost varchar(1),
	SmallPicture varchar(256),
	BigPicture varchar(256),
	IsVerified varchar(1)

)