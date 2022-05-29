
select *
from UsersDB 


except

select u.email 
from UsersDB as U join Hosts as H on u.email = h.email

select * from Hosts
where Hosts.email =  'Birgit85@gmail.com'


select * from Apartments
where id = 2

select * from Reviews


select * 
from Hosts join Apartments on Hosts.email = Apartments.hostEmail


select A.hostEmail, A.id, R.id, R.comments
from Apartments as A join Hosts as H on A.hostEmail = H.email
	join Reviews as R on R.apartmentId = A.id




WITH MyTable AS 
(
  SELECT ROW_NUMBER() OVER(Order By rating desc) AS [row], [id], [propertyType], [hostEmail], [name], [description], [img], [neighborhood], [latitude], [longtitude], [roomType], [numBathrooms], [numBedrooms], [numBeds], [accommodates], [amenities], [price], [minNights], [maxNights], [rating], [reviewAccuracy], [reviewsClean], [reviewLocation]
  FROM Apartments 
)

SELECT *
FROM MyTable
WHERE row between 11 and 20



INSERT INTO Reservations (startDate, endDate, apartmentId, userEmail, isCanceled) 
VALUES ('2022-6-1', '2022-6-3', 1, 'Abhishek72@gmail.com', 0)

INSERT INTO Reservations (startDate, endDate, apartmentId, userEmail, isCanceled) 
VALUES ('2022-6-5', '2022-6-6', 1, 'Abhishek72@gmail.com', 0)


select *
from reservations


DECLARE @start date, @end date
SET @start = '2022-6-3'
SET @end = '2022-6-5'


select *
from Apartments
where id not in (select A.id 
				 from Apartments as A join Reservations as R on A.id = R.apartmentId
				 where (R.endDate > @start and R.endDate < @end ) 
					or (R.startDate > @start and R.startDate < @end)
					and R.isCanceled = 0
				)







select A.id, count(R.id) as 'numOfReviews'
from Reviews as R join Apartments as A on R.apartmentId = A.id
group by A.id


	







