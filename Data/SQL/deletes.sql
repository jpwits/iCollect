/****** Script for SelectTopNRows command from SSMS  ******/
DELETE FROM images where ItemId in (SELECT Items.ItemId as ItemId
  FROM [Northwind].[dbo].[Items] where isActive = 0)

DELETE FROM [Northwind].[dbo].[Items] where isActive = 0