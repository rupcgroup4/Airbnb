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
-- Description:	SP get users future reservations info: ApartmentImg, ApartmentName, StartDate, EndDate
-- =============================================
CREATE PROCEDURE SP_GetUsersFutureReservations
	-- Add the parameters for the stored procedure here
	@email nvarchar(64)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
select R.id as reservationId, A.id as apartmentId, A.img as apartmentImg,
	   A.name as apartmentName,R.startDate, R.endDate, R.isCanceled 	
	from Reservations as R inner join
		 Apartments as A on R.apartmentId=A.id
	where R.userEmail=@email and
		  R.startDate>GETDATE()
END
GO
