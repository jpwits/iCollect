using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iCollect.NW.NW_Entities
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

        public virtual DbSet<SetImages> SetImages { get; set; }
        public virtual DbSet<Sets> Sets { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<SetImages>(entity =>
            {
                entity.HasIndex(e => e.SetId);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Heading)
                    .HasColumnName("heading")
                    .HasMaxLength(100);

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("image");

                entity.Property(e => e.ImageId).HasColumnName("imageId");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.PageNo).HasColumnName("pageNo");

                entity.Property(e => e.Path)
                    .HasColumnName("path")
                    .HasMaxLength(250);

                entity.Property(e => e.SetId).HasColumnName("setId");

                entity.Property(e => e.Thumbnail)
                    .HasColumnName("thumbnail")
                    .HasColumnType("image");

                entity.HasOne(d => d.Set)
                    .WithMany(p => p.SetImages)
                    .HasForeignKey(d => d.SetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SetImages_Sets");
            });

            modelBuilder.Entity<Sets>(entity =>
            {
                entity.HasKey(e => e.SetId);

                entity.Property(e => e.SetId).HasColumnName("setId");

                entity.Property(e => e.CatCode)
                    .HasColumnName("catCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(100);

                entity.Property(e => e.ImageId).HasColumnName("imageId");

                entity.Property(e => e.Range)
                    .HasColumnName("range")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Year)
                    .HasColumnName("year")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
