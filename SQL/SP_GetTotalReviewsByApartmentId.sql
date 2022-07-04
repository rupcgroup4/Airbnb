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
-- Description:	SP get total reviews by apartment id
-- =============================================
CREATE PROCEDURE SP_GetTotalReviewsByApartmentId
	-- Add the parameters for the stored procedure here
@apartmentId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	select count(*) as totalReviews
	from Reviews as R
	where R.apartmentId = @apartmentId
END
GO
