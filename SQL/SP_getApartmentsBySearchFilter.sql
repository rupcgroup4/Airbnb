-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		CGroup4
-- Create date: 3.6.22
-- Description:	SP get apartments by search filters
-- =============================================
CREATE PROCEDURE SP_getApartmentsBySearchFilter 
	-- Add the parameters for the stored procedure here

	@maxPrice smallint,
	@minApartmentRating tinyInt,
	@minBedrooms tinyInt,
	@minAccommodates tinyInt,
	@maxDistanceToCenterKM float,
	@startDate Date,
	@endDate Date, 
	@OrderByColumn nvarchar(30),
	@fromRow int,
	@toRow int
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;


    -- Insert statements for procedure here

	;WITH result AS 
	(	
		SELECT ROW_NUMBER() OVER(Order By (CASE @OrderByColumn
			WHEN 'price_D' THEN price 
			WHEN 'rating_D' THEN rating
			WHEN 'distanceToCenterKM_D' THEN distanceToCenterKM
			END) DESC ,
			(CASE @OrderByColumn
			WHEN 'price_A' THEN price 
			WHEN 'rating_A' THEN rating
			WHEN 'distanceToCenterKM_A' THEN distanceToCenterKM
			END) ASC) AS [row],
			[id], [propertyType], [hostEmail], [name], [description], [img], [neighborhood], [latitude], [longtitude], [distanceToCenterKM], [roomType], [numBathrooms], [numBedrooms], [numBeds], [accommodates], [amenities], [price], [minNights], [maxNights], [rating], [reviewAccuracy], [reviewsClean], [reviewLocation]
			FROM Apartments as A
			WHERE A.id not in (--apartments not avialable in inputed dates
							 SELECT A.id 
							 FROM Apartments AS A join Reservations AS R ON A.id = R.apartmentId
							 WHERE (R.endDate > @startDate and R.endDate <= @endDate  ) 
								or (R.startDate >= @startDate and R.startDate < @endDate )
								and R.isCanceled = 0
						) and A.price <= @maxPrice and
							A.rating >= @minApartmentRating and
							A.numBedrooms >= @minBedrooms and
							A.distanceToCenterKM <= @maxDistanceToCenterKM and
							A.accommodates >= @minAccommodates and
							A.minNights  <= DATEDIFF(day,@startDate, @endDate) 
	)

	SELECT R.id, R.img, R.rating, R.price, R.name,
			R.distanceToCenterKM, R.latitude, R.longtitude, R.minNights
	FROM result as R
	WHERE row between @fromRow and @toRow
	
	
END
GO
