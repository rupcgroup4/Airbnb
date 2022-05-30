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
CREATE PROCEDURE SP_InsertApartment
	-- Add the parameters for the stored procedure here
	@propertyType varchar(50),
	@hostEmail nvarchar(64),
	@name nvarchar(50),
	@description nvarchar(MAX),
	@img nvarchar(256),
	@neighborhood nvarchar(256),
	@latitude float,
	@longtitude float,
	@roomType varchar(20),
	@numBathrooms varchar(20),
	@numBedrooms tinyint,
	@numBeds tinyint,
	@accommodates tinyint,
	@amenities varchar(256),
	@price smallint,
	@minNights tinyint,
	@maxNights smallint,
	@rating float,
	@reviewAccuracy float,
	@reviewsClean float,
	@reviewLocation float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	INSERT INTO apartments (propertyType, hostEmail, name, description, img, neighborhood, latitude, longtitude,
								roomType, numBathrooms, numBedrooms, numBeds, accommodates, amenities, price, minNights, maxNights,
									rating, reviewAccuracy, reviewsClean, reviewLocation)

	VALUES (@PropertyType, @hostEmail, @name, @description, @img, @neighborhood, @latitude, @longtitude,
								@roomType, @numBathrooms, @numBedrooms, @numBeds, @accommodates, @amenities, @price, @minNights, @maxNights,
									@rating, @reviewAccuracy, @reviewsClean, @reviewLocation)
END
GO
