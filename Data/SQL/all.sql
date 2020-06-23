USE [icollectdb]
GO

----Updates 
--UPDATE [dbo].[Sets]
--   SET Series = 'Standard' 
--   WHERE Series is null and Range = 'Krugerrand'
--GO

--UPDATE [dbo].Items
--   SET Weight = '1/10 Oz' 
--   WHERE Weight = '⅒ Oz'
--GO

--UPDATE [dbo].Items
--   SET Denominator = '1/10KR' 
--   WHERE Denominator = '⅒KR'
--GO

----selects
--select * from sets where Range  like'%World%'
--select * from sets where Description  like'%Oom Paul%'
--select * from sets where Range  is null
--select * from sets where Series  is null
--select * from sets where setId = 12
--select * from items where setId = 12
--select Range from sets group by range

--select * from sets where Range  = 'Currency'
--select * from sets where Range  = 'CrownTickey'
--select * from sets where Range  = 'WildLife'
--select * from sets where Range  = 'R1Gold' order by Date
--select * from sets where Range  = 'R2Gold' order by Date
--select * from sets where Range  = 'UnionBuildings'
--select * from sets where Range  = 'SARB'
--select * from sets where Range  = 'Big5'
--select * from sets where Range  = 'Natura'
--select * from sets where Range  = 'Protea'
--select * from sets where Range  = 'Krugerrand'
--select * from sets where Range  = 'MAB'
--select * from sets where Range  = 'MABColor'
--select * from sets where Range  = 'WWF'
--select * from sets where Range  = 'NelsonMandela'
--select * from sets where Range  = 'Polar'
--select * from sets where Range  = 'WorldCupSoccer'
--select * from sets where Range  = 'KruggerProtea'
--select settype from sets group by SetType
--select * from sets where setType is null


--Joins
--select * from Items where Items.ItemId in(
--  select Items.ItemId from Items 
--  join sets on Items.SetId = sets.SetId where sets.Year = 2000 and sets.Range= 'Natura' and Items.Type = 'Coin'  group by Items.ItemId)

--select * from Items where Items.ItemId in(
--  select Items.ItemId from Items 
--  join sets on Items.SetId = sets.SetId where sets.Year = 1987 and sets.Range= 'Krugerrand' and Items.Type = 'Coin'  group by Items.ItemId)


  select * from Items 
  join sets on Items.SetId = sets.SetId 
  where sets.isActive = 'true' and Items.IsActive = 'false'

    select Images.*, Items.* from Images 
	 join Items on Images.ImageId = Items.ImageIdA 
	 join sets on Items.SetId = sets.SetId 
  where sets.isActive = 1 and Items.IsActive = 0

     delete img from  Images img 
	 join Items itm on img.ImageId = itm.ImageIdA 
	 join sets on itm.SetId = sets.SetId 
  where sets.isActive = 1 and itm.IsActive = 0