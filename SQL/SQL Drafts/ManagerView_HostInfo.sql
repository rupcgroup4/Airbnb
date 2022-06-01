WITH MyTable AS 
(
select T1.email, T1.hostSince,T1.NumOfApartments, T1.TotalCanceled, T2.TotalPrice
from 
	(select H.email, H.hostSince, count(distinct A.id) as NumOfApartments,(count(*)-sum(CAST(R.isCanceled AS INT))) as TotalRents, sum(CAST(R.isCanceled AS INT)) as TotalCanceled
	from Hosts as H inner join Reservations as R on H.email=R.userEmail
		inner join Apartments as A on A.id=R.apartmentId
	GROUP BY H.email, H.hostSince) T1 
	inner join 
	(select R.userEmail, sum((DATEDIFF(day, R.startDate, R.endDate)*A.price)) TotalPrice
	from Reservations as R inner join Apartments as A on R.apartmentId=A.id
	where  R.isCanceled=0
	group by R.userEmail) T2 on T1.email=T2.userEmail
)
select H.email,H.hostSince, 
ISNULL(MT.NumOfApartments,0) as TotalRents, 
ISNULL(MT.TotalCanceled,0) AS TotalCanceled,
ISNULL(MT.TotalPrice,0) as TotalPrice
from MyTable AS MT right join Hosts AS H on MT.email = H.email 



