
WITH MyTable AS 
(
select T1.ApartmentId, T1.TotalRentDays, T2.TotalCancelations
from
	(select A.id as ApartmentId, sum(DATEDIFF(day, R.startDate, R.endDate)) as TotalRentDays
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	where R.isCanceled=0
	group by A.id) T1 
	inner join
	(select A.id as ApartmentId, sum(CAST(R.isCanceled AS INT)) as TotalCancelations
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	group by A.id) T2 on T1.ApartmentId=T2.ApartmentId
)
select AP.id,AP.name, ISNULL(MT.TotalRentDays,0) as TotalRentDays, ISNULL(MT.TotalCancelations,0) AS TotalCancelations
from MyTable AS MT right join Apartments AS AP on MT.ApartmentId = AP.id 


