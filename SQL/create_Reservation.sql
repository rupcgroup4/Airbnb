create table Reservations ( 
	id int identity(1,1) primary key,
	startDate date not null check(getDate() <= startDate),
	endDate date not null check(getDate() <= endDate),
	apartmentId int foreign key References Apartments(id) not null,
	userEmail nvarchar(64) foreign key References UsersDB(email) not null,
	check(startDate <= endDate)
)