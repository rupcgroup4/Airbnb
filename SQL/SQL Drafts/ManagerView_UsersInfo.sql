
DECLARE @userEmail nvarchar(64)
SET @userEmail='Abhishek72@gmail.com'
select T1.email, T1.userRegisteredSince,T1.TotalRents, T1.TotalCanceled, T2.TotalPrice
from 
	(select U.email, U.userRegisteredSince, (count(*)-sum(CAST(R.isCanceled AS INT))) as TotalRents, sum(CAST(R.isCanceled AS INT)) as TotalCanceled
	from UsersDB as U inner join Reservations as R on U.email=R.userEmail
		inner join Apartments as A on A.id=R.apartmentId
	where U.email=@userEmail 
	GROUP BY U.email, U.userRegisteredSince) T1 
	inner join 
	(select R.userEmail, sum((DATEDIFF(day, R.startDate, R.endDate)*A.price)) TotalPrice
	from Reservations as R inner join Apartments as A on R.apartmentId=A.id
	where R.userEmail=@userEmail and R.isCanceled=0
	group by R.userEmail) T2 on T1.email=T2.userEmail




