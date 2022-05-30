DECLARE @apartmentId int
SET @apartmentId=1

select T1.ApartmentId, T1.TotalRentDays, T2.TotalCancelations
from
	(select A.id as ApartmentId, sum(DATEDIFF(day, R.startDate, R.endDate)) as TotalRentDays
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	where A.id=@apartmentId and R.isCanceled=0
	group by A.id) T1 
	inner join
	(select A.id as ApartmentId, sum(CAST(R.isCanceled AS INT)) as TotalCancelations
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	where A.id=@apartmentId
	group by A.id) T2 on T1.ApartmentId=T2.ApartmentId






