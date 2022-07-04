create table LikedApartments(
	email nvarchar(64) foreign key references UsersDB(email),
	apartmentId int foreign key references Apartments(id),
	primary key (email, apartmentId)
)