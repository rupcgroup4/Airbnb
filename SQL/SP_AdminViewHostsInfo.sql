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
-- Create date: 1.6.22
-- Description:	SP admin view hosts information
-- =============================================
CREATE PROCEDURE SP_AdminViewHostsInfo
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

WITH MyTable AS 
(
select T1.email, T1.hostSince,T1.NumOfApartments, T1.TotalCanceled, T2.TotalPrice
from 
	(select H.email, H.hostSince, count(distinct A.id) as NumOfApartments,(count(*)-sum(CAST(R.isCanceled AS INT))) as TotalRents, sum(CAST(R.isCanceled AS INT)) as TotalCanceled
	from Hosts as H inner join Apartments as A on H.email= A.hostEmail  
	inner join Reservations as R on A.id=R.apartmentId 
	GROUP BY H.email, H.hostSince) T1 
	inner join 
	(select A.hostEmail, sum((DATEDIFF(day, R.startDate, R.endDate)*A.price)) TotalPrice
	from Reservations as R inner join Apartments as A on R.apartmentId=A.id
	where  R.isCanceled=0
	group by A.hostEmail) T2 on T1.email=T2.hostEmail
)
select H.email,H.hostSince, 
ISNULL(MT.NumOfApartments,0) as TotalRents, 
ISNULL(MT.TotalCanceled,0) AS TotalCanceled,
ISNULL(MT.TotalPrice,0) as TotalPrice
from MyTable AS MT right join Hosts AS H on MT.email = H.email 


END
GO
