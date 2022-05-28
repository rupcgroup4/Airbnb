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
-- Create date: 21.5.2022
-- Description:	Insert User to DataBase
-- =============================================
CREATE PROCEDURE SP_InsertUser
	-- Add the parameters for the stored procedure here
	@email nvarchar(64),
	@username nvarchar(30),
    @password nvarchar(30),
	@firstName nvarchar(30),
	@lastName nvarchar(30),
	@birthDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	INSERT INTO UsersDB ([email],[username],[password], [firstName],[lastName], [birthDate],[userRegisteredSince])

	VALUES(@email,@username, @password, @firstName, @lastName, @birthDate,getDate())
END
GO
