﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using iCollect.Entities;

namespace iCollect.Migrations
{
    [DbContext(typeof(icollectdbContext))]
    partial class icollectdbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("iCollect.Entities.AlbumCollections", b =>
                {
                    b.Property<int>("CollectionId")
                        .HasColumnType("int");

                    b.Property<int>("AlbumId")
                        .HasColumnType("int");

                    b.HasKey("CollectionId", "AlbumId");

                    b.HasIndex("AlbumId");

                    b.ToTable("AlbumCollections");
                });

            modelBuilder.Entity("iCollect.Entities.Albums", b =>
                {
                    b.Property<int>("AlbumId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("varchar(255)")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("JsonRanges")
                        .HasColumnName("jsonRanges")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.Property<string>("JsonSetTypes")
                        .HasColumnName("jsonSetTypes")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.Property<string>("Name")
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("AlbumId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("iCollect.Entities.CollectionTypes", b =>
                {
                    b.Property<int>("CollectionTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("CollectionTypeId");

                    b.ToTable("CollectionTypes");
                });

            modelBuilder.Entity("iCollect.Entities.Collections", b =>
                {
                    b.Property<int>("CollectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CollectionTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("CollectionId");

                    b.HasIndex("CollectionTypeId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("iCollect.Entities.Images", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("DelItemId")
                        .HasColumnName("del_ItemId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Image")
                        .HasColumnType("image");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("ImageId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("iCollect.Entities.Items", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte[]>("DelImage")
                        .HasColumnName("del_Image")
                        .HasColumnType("image");

                    b.Property<string>("Denominator")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<decimal?>("Dimention")
                        .HasColumnType("decimal(18, 3)");

                    b.Property<int?>("ImageIdA")
                        .HasColumnType("int");

                    b.Property<int?>("ImageIdB")
                        .HasColumnType("int");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<decimal?>("Mass")
                        .HasColumnType("decimal(18, 3)");

                    b.Property<string>("MetalContent")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<int?>("Position")
                        .HasColumnType("int");

                    b.Property<decimal?>("PriceEstimated")
                        .HasColumnType("money");

                    b.Property<int>("SetId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Thumbnail")
                        .HasColumnType("image");

                    b.Property<byte[]>("ThumbnailA")
                        .HasColumnType("image");

                    b.Property<byte[]>("ThumbnailB")
                        .HasColumnType("image");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Weight")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("ItemId")
                        .HasName("PK_SetImages");

                    b.HasIndex("ImageIdA");

                    b.HasIndex("ImageIdB");

                    b.HasIndex("SetId")
                        .HasName("IX_SetImages_setId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("iCollect.Entities.Sets", b =>
                {
                    b.Property<int>("SetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CatCode")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int?>("CollectionId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Range")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("SetType")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int?>("Year")
                        .HasColumnType("int");

                    b.HasKey("SetId");

                    b.HasIndex("CollectionId");

                    b.ToTable("Sets");
                });

            modelBuilder.Entity("iCollect.Entities.UserItems", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("ItemId");

                    b.ToTable("UserItems");
                });

            modelBuilder.Entity("iCollect.Entities.AlbumCollections", b =>
                {
                    b.HasOne("iCollect.Entities.Albums", "Album")
                        .WithMany("AlbumCollections")
                        .HasForeignKey("AlbumId")
                        .HasConstraintName("FK_AlbumCollections_Albums")
                        .IsRequired();

                    b.HasOne("iCollect.Entities.Collections", "Collection")
                        .WithMany("AlbumCollections")
                        .HasForeignKey("CollectionId")
                        .HasConstraintName("FK_AlbumCollections_Collections")
                        .IsRequired();
                });

            modelBuilder.Entity("iCollect.Entities.Collections", b =>
                {
                    b.HasOne("iCollect.Entities.CollectionTypes", "CollectionType")
                        .WithMany("Collections")
                        .HasForeignKey("CollectionTypeId")
                        .HasConstraintName("FK_Collections_CollectionTypes");
                });

            modelBuilder.Entity("iCollect.Entities.Items", b =>
                {
                    b.HasOne("iCollect.Entities.Images", "ImageIdANavigation")
                        .WithMany("ItemsImageIdANavigation")
                        .HasForeignKey("ImageIdA")
                        .HasConstraintName("FK_Items_Images");

                    b.HasOne("iCollect.Entities.Images", "ImageIdBNavigation")
                        .WithMany("ItemsImageIdBNavigation")
                        .HasForeignKey("ImageIdB")
                        .HasConstraintName("FK_Items_Images1");

                    b.HasOne("iCollect.Entities.Sets", "Set")
                        .WithMany("Items")
                        .HasForeignKey("SetId")
                        .HasConstraintName("FK_Items_Sets")
                        .IsRequired();
                });

            modelBuilder.Entity("iCollect.Entities.Sets", b =>
                {
                    b.HasOne("iCollect.Entities.Collections", "Collection")
                        .WithMany("Sets")
                        .HasForeignKey("CollectionId")
                        .HasConstraintName("FK_Sets_Collections");
                });

            modelBuilder.Entity("iCollect.Entities.UserItems", b =>
                {
                    b.HasOne("iCollect.Entities.Albums", "Album")
                        .WithMany("UserItems")
                        .HasForeignKey("AlbumId")
                        .HasConstraintName("FK_UserItems_Albums");

                    b.HasOne("iCollect.Entities.Items", "Item")
                        .WithMany("UserItems")
                        .HasForeignKey("ItemId")
                        .HasConstraintName("FK_UserItems_Items")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
