--INSERT INTO NorthWind.dbo.Images ([Image], CoinOrSetId)
--values ((SELECT * FROM OPENROWSET(BULK N'D:\GoogleDrive\JPW-Col\SAGC\2013\COL WILD LIFE 50c 2Oz\$(KGrHqJ,!qIFHG)Q+IDPBR4-+JZrG!--60_57.JPG', SINGLE_BLOB) as [Image]),
--null)

declare @files table (ID int IDENTITY, FileName varchar(255))
DECLARE @lpath varchar(255)
DECLARE @year int
set @year = 1987
declare @sql varchar(255)
WHILE @year < 2016
BEGIN
	set @sql = 'dir D:\GoogleDrive\JPW-Col\SAGC\' + CAST(@year as varchar(255))  + '\* /b /s /a:-D'
	insert into @files execute xp_cmdshell @sql
	set @year = @year+1
END

INSERT INTO NorthWind.dbo.Images (InitPath) (select FileName from @files)


	--INSERT INTO NorthWind.dbo.Images ([Image],InitPath)
	--values ((SELECT * FROM OPENROWSET(BULK N'D:\GoogleDrive\JPW-Col\SAGC\2013\COL WILD LIFE 50c 2Oz\$(KGrHqJ,!qIFHG)Q+IDPBR4-+JZrG!--60_57.JPG', SINGLE_BLOB) as [Image]),N'D:\GoogleDrive\JPW-Col\SAGC\2013\COL WILD LIFE 50c 2Oz\$(KGrHqJ,!qIFHG)Q+IDPBR4-+JZrG!--60_57.JPG') 


--INSERT INTO NorthWind.dbo.Images ([Image],InitPath) values ((SELECT * FROM OPENROWSET(BULK N'D:\GoogleDrive\JPW-Col\SAGC\1987\1920903_140505125044_coins_1334.jpg', SINGLE_BLOB) as [Image]),N'D:\GoogleDrive\JPW-Col\SAGC\1987\1920903_140505125044_coins_1334.jpg')

--GO  