DECLARE @maxPrice smallint, @minApartmentRating tinyInt,
		@minBedrooms tinyInt,@maxDistanceToCenterKM float,
		@startDate Date, @endDate Date, @OrderByColumn nvarchar(30)

--SET @OrderByColumn='price_D'
--SET @maxPrice= 500
--SET @minApartmentRating= 4
--SET @minBedrooms= 1
--SET @maxDistanceToCenterKM= 2.2
--SET @startDate= '2022-6-5'
--SET @endDate= '2022-6-6'

select *
from Apartments as A
where A.id not in (--apartments not avialable in inputed dates
					 select A.id 
					 from Apartments as A join Reservations as R on A.id = R.apartmentId
					 where (R.endDate > @startDate and R.endDate <= @endDate  ) 
						or (R.startDate >= @startDate and R.startDate < @endDate )
						and R.isCanceled = 0
				) and A.price<=@maxPrice and
					A.rating>=@minApartmentRating and
					A.numBedrooms>=@minBedrooms and
					A.distanceToCenterKM <=@maxDistanceToCenterKM
order by (CASE @OrderByColumn
		WHEN 'price_D' THEN A.price 
		WHEN 'rating_D' THEN A.rating
		WHEN 'distanceToCenterKM_D' THEN A.distanceToCenterKM
		END) DESC,
		(CASE @OrderByColumn
		WHEN 'price_A' THEN A.price 
		WHEN 'rating_A' THEN A.rating
		WHEN 'distanceToCenterKM_A' THEN A.distanceToCenterKM
		END) ASC ; 
		 

