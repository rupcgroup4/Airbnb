create table Reviews ( 
	id int identity(1,1) primary key,
	apartmentId int not null,
	userName nvarchar(30) not null,
	reviewDate date check(reviewDate <= getdate()),
	comments nvarchar(MAX)
)
