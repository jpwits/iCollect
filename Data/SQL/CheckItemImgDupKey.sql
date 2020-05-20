/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [ItemId]

  FROM [Northwind].[dbo].[Items] order by ImageIdA

  SELECT ItemId, ImageIdA 
FROM   Items 
WHERE  ImageIdA NOT IN (SELECT ImageId FROM Images)

  SELECT ItemId, ImageIdB
FROM   Items 
WHERE  ImageIdA NOT IN (SELECT ImageId FROM Images)