create table Reviews ( 
id int identity(1,1) primary key,
apartmentId int not null,
reviewerId int not null,
reviewerName nvarchar(30) not null,
reviewDate date not null check(reviewDate <= getdate()),
comments nvarchar(MAX)
)
