create table apartments (
	Id int identity(1,1) primary key,
	PropertyType varchar(50) not null,
	HostId int foreign key references host(Id),
	Name varchar(50),
	Description varchar(256),
	Picture varchar(256),
	Neighborhood varchar(256),
	Latitude varchar(10),
	Longtitude varchar(10),
	RoomType varchar(20),
	Bathrooms varchar(20),
	Bedrooms tinyint,
	Beds tinyint,
	Accommodates tinyint,
	Amenities varchar(256),
	price smallint,
	MinNights tinyint,
	MaxNights smallint,
	Rating float,
	ReviewAccuracy float,
	ReviewsClean float,
	ReviewLocation float

)
