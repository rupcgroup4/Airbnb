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
-- Create date: 31.5.22
-- Description:	SP Admin view users info
-- =============================================
CREATE PROCEDURE SP_AdminViewUsersInfo
	-- Add the parameters for the stored procedure here
@userEmail nvarchar(64)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

select T1.email, T1.userRegisteredSince,T1.TotalRents, T1.TotalCanceled, T2.TotalPrice
from 
	(select U.email, U.userRegisteredSince, (count(*)-sum(CAST(R.isCanceled AS INT))) as TotalRents, sum(CAST(R.isCanceled AS INT)) as TotalCanceled
	from UsersDB as U inner join Reservations as R on U.email=R.userEmail
		inner join Apartments as A on A.id=R.apartmentId
	where U.email=@userEmail 
	GROUP BY U.email, U.userRegisteredSince) T1 
	inner join 
	(select R.userEmail, sum((DATEDIFF(day, R.startDate, R.endDate)*A.price)) TotalPrice
	from Reservations as R inner join Apartments as A on R.apartmentId=A.id
	where R.userEmail=@userEmail and R.isCanceled=0
	group by R.userEmail) T2 on T1.email=T2.userEmail
END
GO
