﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iCollect.Entities
{
    public partial class NorthwindContext : DbContext
    {
        public NorthwindContext()
        {
        }

        public NorthwindContext(DbContextOptions<NorthwindContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Collections> Collections { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<Sets> Sets { get; set; }
        public virtual DbSet<UserParts> UserParts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-7DQTMIU\\SQLEXPRESS;Initial Catalog=Northwind;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Collections>(entity =>
            {
                entity.HasKey(e => e.CollectionId);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Items>(entity =>
            {
                entity.HasKey(e => e.ImageId)
                    .HasName("PK_SetImages");

                entity.HasIndex(e => e.SetId)
                    .HasName("IX_SetImages_setId");

                entity.Property(e => e.DelImageId).HasColumnName("del_imageId");

                entity.Property(e => e.DelPageNo).HasColumnName("del_pageNo");

                entity.Property(e => e.DelPath)
                    .HasColumnName("del_path")
                    .HasMaxLength(250);

                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.Image).HasColumnType("image");

                entity.Property(e => e.Thumbnail).HasColumnType("image");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Set)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.SetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SetImages_Sets");
            });

            modelBuilder.Entity<Sets>(entity =>
            {
                entity.HasKey(e => e.SetId);

                entity.Property(e => e.CatCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.Range)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Year)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Collection)
                    .WithMany(p => p.Sets)
                    .HasForeignKey(d => d.CollectionId)
                    .HasConstraintName("FK_Sets_Collections");
            });

            modelBuilder.Entity<UserParts>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
