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
-- Description:	Insert Host to DataBase
-- =============================================
CREATE PROCEDURE SPInsertHost
	-- Add the parameters for the stored procedure here
	@FirstName varchar(30),
	@LastName varchar(30),
	@Email varchar(30),
	@Password varchar(30),
	@BirthDate date,
	@HostSince date,
	@Location varchar(50),
	@About varchar(256),
	@ResponseTime varchar(20),
	@ResponseRate varchar(20),
	@IsSuperHost varchar(1),
	@SmallPicture varchar(256),
	@BigPicture varchar(256),
	@IsVerified varchar(1)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
	INSERT INTO host (FirstName, LastName, Email, Password, BirthDate, HostSince, 
						Location, About, ResponseTime, ResponseRate, IsSuperHost, SmallPicture, BigPicture, IsVerified)

	VALUES(@FirstName, @LastName, @Email, @Password, @BirthDate, @HostSince,
			@Location, @About, @ResponseTime, @ResponseRate, @IsSuperHost, @SmallPicture, @BigPicture, @IsVerified)
			
			
END
GO
