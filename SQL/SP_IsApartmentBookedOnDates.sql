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
-- Create date: 2.6.2022
-- Description:	SP check if apartment available on dates
-- =============================================
CREATE PROCEDURE SP_IsApartmentBookedOnDates 
	-- Add the parameters for the stored procedure here
	@start date, 
	@end date, 
	@apartmentId int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	SELECT id
	FROM Apartments
	WHERE  id = @apartmentId 
		AND id IN (SELECT A.id 
					   FROM Apartments AS A JOIN Reservations AS R ON A.id = R.apartmentId
					   where (R.endDate > @start AND R.endDate <= @end ) 
							OR (R.startDate >= @start AND R.startDate < @end)
								AND R.isCanceled = 0
					  ) 
END
GO
