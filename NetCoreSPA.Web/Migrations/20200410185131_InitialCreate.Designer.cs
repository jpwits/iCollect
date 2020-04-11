﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using iCollect.Entities;

namespace iCollect.Migrations
{
    [DbContext(typeof(NorthwindContext))]
    [Migration("20200410185131_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("iCollect.Entities.Collections", b =>
                {
                    b.Property<int>("CollectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.HasKey("CollectionId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("iCollect.Entities.Images", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DelItemId")
                        .HasColumnName("del_ItemId")
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("Image")
                        .HasColumnType("image");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50);

                    b.HasKey("ImageId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("iCollect.Entities.Items", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("DelImage")
                        .HasColumnName("del_Image")
                        .HasColumnType("image");

                    b.Property<string>("Denominator")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasMaxLength(100);

                    b.Property<decimal?>("Dimention")
                        .HasColumnType("decimal(18, 3)");

                    b.Property<int?>("ImageIdA")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ImageIdB")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<decimal?>("Mass")
                        .HasColumnType("decimal(18, 3)");

                    b.Property<string>("MetalContent")
                        .HasColumnType("TEXT")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.Property<int?>("Position")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SetId")
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("Thumbnail")
                        .HasColumnType("image");

                    b.Property<byte[]>("ThumbnailA")
                        .HasColumnType("image");

                    b.Property<byte[]>("ThumbnailB")
                        .HasColumnType("image");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Weight")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

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
                        .HasColumnType("INTEGER");

                    b.Property<string>("CatCode")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<int?>("CollectionId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasMaxLength(100);

                    b.Property<string>("Range")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("SetType")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Year")
                        .HasColumnType("TEXT")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("SetId");

                    b.HasIndex("CollectionId");

                    b.ToTable("Sets");
                });

            modelBuilder.Entity("iCollect.Entities.UserItems", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ItemId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasMaxLength(255)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.ToTable("UserItems");
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
