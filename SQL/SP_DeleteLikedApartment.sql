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
-- Author:		CGroup04
-- Create date: 3.7.2022
-- Description:	SP Delete Liked Apartment
-- =============================================
CREATE PROCEDURE SP_DeleteLikedApartment
	@email nvarchar(64),
	@apartmentId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT Off;

    -- Insert statements for procedure here
	Delete from likedApartments
	where email = @email and apartmentId = @ApartmentId;
END
GO
