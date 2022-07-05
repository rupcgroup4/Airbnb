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
-- Author:		CGroyp4
-- Create date: 3.6.2022
-- Description:	SP Insert Reservation
-- =============================================
CREATE PROCEDURE SP_InsertReservation 
	-- Add the parameters for the stored procedure here
	@startDate date,
	@endDate date,
	@apartmentId int,
	@userEmail nvarchar(64)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	INSERT INTO Reservations (startDate, endDate, apartmentId, userEmail, isCanceled, hasReview) 
	VALUES (@startDate, @endDate, @apartmentId, @userEmail, 0, 0) 
	select SCOPE_IDENTITY() as id
 
END
GO


