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
-- Create date: 19.5.2022
-- Description:	insert apartment
-- =============================================
CREATE PROCEDURE SPInsertApartment
	-- Add the parameters for the stored procedure here
	@PropertyType varchar(50),
	@HostId int,
	@Name varchar(50),
	@Description varchar(256),
	@Picture varchar(256),
	@Neighborhood varchar(256),
	@Latitude varchar(10),
	@Longtitude varchar(10),
	@RoomType varchar(20),
	@Bathrooms varchar(20),
	@Bedrooms tinyint,
	@Beds tinyint,
	@Accommodates tinyint,
	@Amenities varchar(256),
	@Price smallint,
	@MinNights tinyint,
	@MaxNights smallint,
	@Rating float,
	@ReviewAccuracy float,
	@ReviewsClean float,
	@ReviewLocation float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	INSERT INTO apartments (PropertyType, HostId, Name, Description, Picture, Neighborhood, Latitude, Longtitude,
								RoomType, Bathrooms, Bedrooms, Beds, Accommodates, Amenities, price, MinNights, MaxNights,
									Rating, ReviewAccuracy, ReviewsClean, ReviewLocation)

	VALUES (@PropertyType, @HostId, @Name, @Description, @Picture, @Neighborhood, @Latitude, @Longtitude,
								@RoomType, @Bathrooms, @Bedrooms, @Beds, @Accommodates, @Amenities, @Price, @MinNights, @MaxNights,
									@Rating, @ReviewAccuracy, @ReviewsClean, @ReviewLocation)
END
GO
