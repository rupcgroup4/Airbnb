create table Reservations ( 
	id int identity(1,1) primary key,
	startDate date not null check(datediff(day, getDate(),startDate) >= 0),
	endDate date not null check(datediff(day, getDate(), endDate) > 0),
	apartmentId int foreign key References Apartments(id) not null,
	userEmail nvarchar(64) foreign key References UsersDB(email) not null,
	isCanceled bit not null, 
	check(startDate <= endDate),
)


