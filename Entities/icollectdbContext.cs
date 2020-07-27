using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iCollect.Entities
{
    public partial class icollectdbContext : DbContext
    {
        public icollectdbContext()
        {
        }

        public icollectdbContext(DbContextOptions<icollectdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AlbumCatalogs> AlbumCatalogs { get; set; }
        public virtual DbSet<Albums> Albums { get; set; }
        public virtual DbSet<Catalog> Catalog { get; set; }
        public virtual DbSet<CatalogTypes> CatalogTypes { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<Sets> Sets { get; set; }
        public virtual DbSet<UserItems> UserItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-4NM3MIF\\SQLEXPRESS;Initial Catalog=icollectdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AlbumCatalogs>(entity =>
            {
                entity.HasKey(e => new { e.CatalogId, e.AlbumId })
                    .HasName("PK_AlbumCatalog");

                entity.HasIndex(e => e.AlbumId)
                    .HasName("IX_AlbumCatalog_AlbumId");

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.AlbumCatalogs)
                    .HasForeignKey(d => d.AlbumId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlbumCatalogs_Albums");

                entity.HasOne(d => d.Catalog)
                    .WithMany(p => p.AlbumCatalogs)
                    .HasForeignKey(d => d.CatalogId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlbumCatalogs_Catalogs");
            });

            modelBuilder.Entity<Albums>(entity =>
            {
                entity.HasKey(e => e.AlbumId);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.JsonRanges)
                    .HasColumnName("jsonRanges")
                    .HasMaxLength(1024);

                entity.Property(e => e.JsonSetTypes)
                    .HasColumnName("jsonSetTypes")
                    .HasMaxLength(1024);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Catalog>(entity =>
            {
                entity.HasIndex(e => e.CatalogTypeId)
                    .HasName("IX_Catlog_CatalogTypeId");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.SEndDate)
                    .HasColumnName("sEndDate")
                    .HasColumnType("date");

                entity.Property(e => e.SStartDate)
                    .HasColumnName("sStartDate")
                    .HasColumnType("date");

                entity.HasOne(d => d.CatalogType)
                    .WithMany(p => p.Catalog)
                    .HasForeignKey(d => d.CatalogTypeId)
                    .HasConstraintName("FK_Catalogs_CatalogTypes");
            });

            modelBuilder.Entity<CatalogTypes>(entity =>
            {
                entity.HasKey(e => e.CatalogTypeId);

                entity.Property(e => e.Type).HasMaxLength(255);
            });

            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(e => e.ImageId);

                entity.Property(e => e.DelItemId).HasColumnName("del_ItemId");

                entity.Property(e => e.Image).HasColumnType("image");

                entity.Property(e => e.Type).HasMaxLength(50);
            });

            modelBuilder.Entity<Items>(entity =>
            {
                entity.HasKey(e => e.ItemId)
                    .HasName("PK_SetImages");

                entity.HasIndex(e => e.ImageIdA);

                entity.HasIndex(e => e.ImageIdB);

                entity.HasIndex(e => e.SetId)
                    .HasName("IX_SetImages_setId");

                entity.Property(e => e.DelImage)
                    .HasColumnName("del_Image")
                    .HasColumnType("image");

                entity.Property(e => e.Denominator).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.Dimension).HasColumnType("decimal(18, 3)");

                entity.Property(e => e.LinkedItem).HasColumnName("linkedItem");

                entity.Property(e => e.Mass).HasColumnType("decimal(18, 3)");

                entity.Property(e => e.MetalContent).HasMaxLength(255);

                entity.Property(e => e.PriceEstimated).HasColumnType("money");

                entity.Property(e => e.Thumbnail).HasColumnType("image");

                entity.Property(e => e.ThumbnailA).HasColumnType("image");

                entity.Property(e => e.ThumbnailB).HasColumnType("image");

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.Property(e => e.Weight).HasMaxLength(50);

                entity.HasOne(d => d.ImageIdANavigation)
                    .WithMany(p => p.ItemsImageIdANavigation)
                    .HasForeignKey(d => d.ImageIdA)
                    .HasConstraintName("FK_Items_Images");

                entity.HasOne(d => d.ImageIdBNavigation)
                    .WithMany(p => p.ItemsImageIdBNavigation)
                    .HasForeignKey(d => d.ImageIdB)
                    .HasConstraintName("FK_Items_Images1");

                entity.HasOne(d => d.Set)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.SetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Items_Sets");
            });

            modelBuilder.Entity<Sets>(entity =>
            {
                entity.HasKey(e => e.SetId);

                entity.HasIndex(e => e.CatalogId)
                    .HasName("IX_Sets_CatlogId");

                entity.Property(e => e.CatCode).HasMaxLength(50);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Range).HasMaxLength(50);

                entity.Property(e => e.Series).HasMaxLength(255);

                entity.Property(e => e.SetType).HasMaxLength(50);

                entity.HasOne(d => d.Catalog)
                    .WithMany(p => p.Sets)
                    .HasForeignKey(d => d.CatalogId)
                    .HasConstraintName("FK_Sets_Catalogs");
            });

            modelBuilder.Entity<UserItems>(entity =>
            {
                entity.HasIndex(e => e.AlbumId);

                entity.HasIndex(e => e.ItemId);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.UserItems)
                    .HasForeignKey(d => d.AlbumId)
                    .HasConstraintName("FK_UserItems_Albums");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.UserItems)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserItems_Items");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
