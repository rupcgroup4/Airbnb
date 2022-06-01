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
-- Description:	SP Admin view apartment information
-- =============================================
CREATE PROCEDURE SP_AdminViewApartmentsInfo
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

WITH MyTable AS 
(
select T1.ApartmentId, T1.TotalRentDays, T2.TotalCancelations
from
	(select A.id as ApartmentId, sum(DATEDIFF(day, R.startDate, R.endDate)) as TotalRentDays
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	where R.isCanceled=0
	group by A.id) T1 
	inner join
	(select A.id as ApartmentId, sum(CAST(R.isCanceled AS INT)) as TotalCancelations
	from Apartments as A inner join Reservations as R on A.id=R.apartmentId
	group by A.id) T2 on T1.ApartmentId=T2.ApartmentId
)
select AP.id,AP.name, ISNULL(MT.TotalRentDays,0) as TotalRentDays, ISNULL(MT.TotalCancelations,0) AS TotalCancelations
from MyTable AS MT right join Apartments AS AP on MT.ApartmentId = AP.id 
END
GO
