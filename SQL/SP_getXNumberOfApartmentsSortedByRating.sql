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
-- Create date: 25.5.2022
-- Description:	SP get 12 apartments sorted by rating
-- =============================================
CREATE PROCEDURE SP_getXNumberOfApartmentsSortedByRating
	-- Add the parameters for the stored procedure here
	@fromRow int,
	@toRow int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	WITH MyTable AS 
	(
	  SELECT ROW_NUMBER() OVER(Order By rating desc) AS [row], [id], [propertyType], [hostEmail], [name], [description], [img], [neighborhood], [latitude], [longtitude], [distanceToCenterKM], [roomType], [numBathrooms], [numBedrooms], [numBeds], [accommodates], [amenities], [price], [minNights], [maxNights], [rating], [reviewAccuracy], [reviewsClean], [reviewLocation]
	  FROM Apartments 
	)

	SELECT *
	FROM MyTable
	WHERE row between @fromRow and @toRow

END
GO
