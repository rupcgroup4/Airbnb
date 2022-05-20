create table Reservation ( 
id int identity(1,1) primary key,
startDate date not null check(getDate() <= startDate),
endDate date not null check(getDate() <= endDate),
apartmentId int not null,
hostId int not null,
userId int not null,
check(startDate <= endDate)
)