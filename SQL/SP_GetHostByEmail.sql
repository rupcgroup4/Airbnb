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
-- Create date: 19.5.2022
-- Description:	Get Host By Email
-- =============================================
CREATE PROCEDURE SP_GetHostByEmail
	-- Add the parameters for the stored procedure here
	@email nvarchar(64)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	SELECT H.email, U.firstName, H.img, H.isSuperHost, H.isVerified 
	FROM Hosts as H join UsersDB as U on H.email = U.email
	WHERE H.email = @email
END
GO
