
ALTER DATABASE [icollectdb] SET COMPATIBILITY_LEVEL = 140
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlbumCollections](
	[CollectionId] [int] NULL,
	[AlbumId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Albums]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Albums](
	[AlbumId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](255) NULL,
	[UserId] [varchar](50) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_Albums] PRIMARY KEY CLUSTERED 
(
	[AlbumId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Collections]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Collections](
	[CollectionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Description] [nvarchar](255) NULL,
 CONSTRAINT [PK_Collections] PRIMARY KEY CLUSTERED 
(
	[CollectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[ImageId] [int] IDENTITY(1,1) NOT NULL,
	[del_ItemId] [int] NULL,
	[Image] [image] NULL,
	[Type] [nvarchar](50) NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[ItemId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](100) NULL,
	[SetId] [int] NOT NULL,
	[Thumbnail] [image] NULL,
	[del_Image] [image] NULL,
	[IsActive] [bit] NULL,
	[Position] [int] NULL,
	[Type] [nvarchar](50) NULL,
	[Denominator] [nvarchar](50) NULL,
	[Mass] [decimal](18, 3) NULL,
	[MetalContent] [nvarchar](255) NULL,
	[Dimention] [decimal](18, 3) NULL,
	[Weight] [nvarchar](50) NULL,
	[ImageIdA] [int] NULL,
	[ImageIdB] [int] NULL,
	[ThumbnailA] [image] NULL,
	[ThumbnailB] [image] NULL,
 CONSTRAINT [PK_SetImages] PRIMARY KEY CLUSTERED 
(
	[ItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sets]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sets](
	[SetId] [int] IDENTITY(1,1) NOT NULL,
	[CollectionId] [int] NULL,
	[Year] [int] NULL,
	[Description] [nvarchar](100) NULL,
	[Date] [date] NULL,
	[Range] [nvarchar](50) NULL,
	[CatCode] [nvarchar](50) NULL,
	[SetType] [nvarchar](50) NULL,
 CONSTRAINT [PK_Sets] PRIMARY KEY CLUSTERED 
(
	[SetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserItems]    Script Date: 2020/04/25 15:38:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](255) NOT NULL,
	[ItemId] [int] NOT NULL,
	[Quantity] [int] NULL,
 CONSTRAINT [PK_UserItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_SetImages_setId]    Script Date: 2020/04/25 15:38:27 ******/
CREATE NONCLUSTERED INDEX [IX_SetImages_setId] ON [dbo].[Items]
(
	[SetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AlbumCollections]  WITH CHECK ADD  CONSTRAINT [FK_AlbumCollections_Albums] FOREIGN KEY([AlbumId])
REFERENCES [dbo].[Albums] ([AlbumId])
GO
ALTER TABLE [dbo].[AlbumCollections] CHECK CONSTRAINT [FK_AlbumCollections_Albums]
GO
ALTER TABLE [dbo].[AlbumCollections]  WITH CHECK ADD  CONSTRAINT [FK_AlbumCollections_Collections] FOREIGN KEY([CollectionId])
REFERENCES [dbo].[Collections] ([CollectionId])
GO
ALTER TABLE [dbo].[AlbumCollections] CHECK CONSTRAINT [FK_AlbumCollections_Collections]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Images] FOREIGN KEY([ImageIdA])
REFERENCES [dbo].[Images] ([ImageId])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Images]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Images1] FOREIGN KEY([ImageIdB])
REFERENCES [dbo].[Images] ([ImageId])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Images1]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Sets] FOREIGN KEY([SetId])
REFERENCES [dbo].[Sets] ([SetId])
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Sets]
GO
ALTER TABLE [dbo].[Sets]  WITH CHECK ADD  CONSTRAINT [FK_Sets_Collections] FOREIGN KEY([CollectionId])
REFERENCES [dbo].[Collections] ([CollectionId])
GO
ALTER TABLE [dbo].[Sets] CHECK CONSTRAINT [FK_Sets_Collections]
GO
ALTER TABLE [dbo].[UserItems]  WITH CHECK ADD  CONSTRAINT [FK_UserItems_Items] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Items] ([ItemId])
GO
ALTER TABLE [dbo].[UserItems] CHECK CONSTRAINT [FK_UserItems_Items]
GO
ALTER DATABASE [icollectdb] SET  READ_WRITE 
GO
