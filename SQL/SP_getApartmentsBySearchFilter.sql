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
	@OrderByColumn nvarchar(30) 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	if @maxPrice is null SET @maxPrice=32767
	if @minApartmentRating is null SET @minApartmentRating=1
	if @minBedrooms is null SET @minBedrooms=0
	if @maxDistanceToCenterKM is null SET @maxDistanceToCenterKM=1000
	if @startDate is null SET @startDate='9999-1-1'
	if @endDate is null SET @endDate='9999-1-1'
	if @OrderByColumn is null SET @OrderByColumn='rating_D'

    -- Insert statements for procedure here
	
select *
from Apartments as A
where A.id not in (--apartments not avialable in inputed dates
					 select A.id 
					 from Apartments as A join Reservations as R on A.id = R.apartmentId
					 where (R.endDate > @startDate and R.endDate <= @endDate  ) 
						or (R.startDate >= @startDate and R.startDate < @endDate )
						and R.isCanceled = 0
				) and A.price <= @maxPrice and
					A.rating >= @minApartmentRating and
					A.numBedrooms >= @minBedrooms and
					A.distanceToCenterKM <= @maxDistanceToCenterKM and
					A.accommodates >= @minAccommodates
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
END
GO
