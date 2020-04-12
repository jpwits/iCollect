
--Drop table items
--Go

SELECT  Links.Heading, Links.PageNo, Images2.Path, Sets.SetId, Images2.Id as ImageId INTO SetImages
FROM Links
INNER JOIN Links2 ON Links.PageNo=Links2.PageNo
INNER JOIN Images2 ON Links2.FileName = Images2.FileName 
INNER JOIN Sets ON (Sets.Year + ' ' + Sets.Description) = Links.Heading
where Links2.Path IS NOT NULL
ORDER BY Links.Heading