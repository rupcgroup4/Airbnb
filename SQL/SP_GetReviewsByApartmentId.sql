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
-- Create date: 4.7.22
-- Description:	SP get number of reviews by Apartment id and NumOfPages
-- =============================================
CREATE PROCEDURE SP_GetReviewsByApartmentId
	-- Add the parameters for the stored procedure here
@apartmentId int,
@NumOfPage int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
WITH result AS 
(	
SELECT ROW_NUMBER() OVER(ORDER BY R.reviewDate DESC) AS [row], 
		R.id,R.apartmentId,R.userName,R.reviewDate,R.comments
FROM Reviews as R 
WHERE R.apartmentId = @apartmentId

)
SELECT RE.id,RE.apartmentId,RE.userName,RE.reviewDate,RE.comments
FROM result as RE
WHERE row between ((@NumOfPage*6)-5) and (@NumOfPage*6)
ORDER BY RE.reviewDate DESC

END
GO
