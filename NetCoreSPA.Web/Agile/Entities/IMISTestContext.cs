using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TGIS.Web.Models;

namespace IMIS.Web.DAL
{
    public partial class IMISTestContext : DbContext
    {
        public IMISTestContext()
        {
        }

        public IMISTestContext(DbContextOptions<IMISTestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PmEpics> PmEpics { get; set; }
        public virtual DbSet<PmFeatures> PmFeatures { get; set; }
        public virtual DbSet<PmIssues> PmIssues { get; set; }
        public virtual DbSet<PmProjectEpicLink> PmProjectEpicLink { get; set; }
        public virtual DbSet<PmProjectFeaturesLink> PmProjectFeaturesLink { get; set; }
        public virtual DbSet<PmProjects> PmProjects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=WideWorldImporters;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<PmEpics>(entity =>
            {
                entity.HasKey(e => e.PmEpicId)
                    .HasName("PK_dbo.PM_EPICS");

                entity.ToTable("PM_EPICS");

                entity.Property(e => e.PmEpicId).HasColumnName("PM_EPIC_ID");

                entity.Property(e => e.PmEpicName)
                    .HasColumnName("PM_EPIC_NAME")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PmFeatures>(entity =>
            {
                entity.HasKey(e => e.PmFeatureId)
                    .HasName("PK_dbo.PM_FEATURES");

                entity.ToTable("PM_FEATURES");

                entity.Property(e => e.PmFeatureId).HasColumnName("PM_FEATURE_ID");

                entity.Property(e => e.PmFeatureName)
                    .HasColumnName("PM_FEATURE_NAME")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PmIssues>(entity =>
            {
                entity.HasKey(e => e.PmIssueId)
                    .HasName("PK_dbo.PM_ISSUES");

                entity.ToTable("PM_ISSUES");

                entity.Property(e => e.PmIssueId).HasColumnName("PM_ISSUE_ID");

                entity.Property(e => e.PmDescription)
                    .HasColumnName("PM_DESCRIPTION")
                    .IsUnicode(false);

                entity.Property(e => e.PmEpicId).HasColumnName("PM_EPIC_ID");

                entity.Property(e => e.PmFeatureId).HasColumnName("PM_FEATURE_ID");

                entity.Property(e => e.PmIssueType).HasColumnName("PM_ISSUE_TYPE");

                entity.Property(e => e.PmPriorityId).HasColumnName("PM_PRIORITY_ID");

                entity.Property(e => e.PmProjectId).HasColumnName("PM_PROJECT_ID");

                entity.Property(e => e.PmTitle)
                    .HasColumnName("PM_TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RelatedIssueId).HasColumnName("RELATED_ISSUE_ID");

                entity.HasOne(d => d.PmProject)
                    .WithMany(p => p.PmIssues)
                    .HasForeignKey(d => d.PmProjectId)
                    .HasConstraintName("FK_PM_ISSUES_PM_PROJECTS");
            });

            modelBuilder.Entity<PmProjectEpicLink>(entity =>
            {
                entity.HasKey(e => new { e.PmProjectId, e.PmEpicId })
                    .HasName("PK_dbo.PM_PROJECT_EPIC_LINK");

                entity.ToTable("PM_PROJECT_EPIC_LINK");

                entity.Property(e => e.PmProjectId).HasColumnName("PM_PROJECT_ID");

                entity.Property(e => e.PmEpicId).HasColumnName("PM_EPIC_ID");

                entity.HasOne(d => d.PmEpic)
                    .WithMany(p => p.PmProjectEpicLink)
                    .HasForeignKey(d => d.PmEpicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PM_PROJECT_EPIC_LINK_PM_EPICS");

                entity.HasOne(d => d.PmProject)
                    .WithMany(p => p.PmProjectEpicLink)
                    .HasForeignKey(d => d.PmProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PM_PROJECT_EPIC_LINK_PM_PROJECTS");
            });

            modelBuilder.Entity<PmProjectFeaturesLink>(entity =>
            {
                entity.HasKey(e => new { e.PmProjectId, e.PmFeatureId })
                    .HasName("PK_dbo.PM_PROJECT_FEATURES_LINK");

                entity.ToTable("PM_PROJECT_FEATURES_LINK");

                entity.Property(e => e.PmProjectId).HasColumnName("PM_PROJECT_ID");

                entity.Property(e => e.PmFeatureId).HasColumnName("PM_FEATURE_ID");

                entity.HasOne(d => d.PmFeature)
                    .WithMany(p => p.PmProjectFeaturesLink)
                    .HasForeignKey(d => d.PmFeatureId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PM_PROJECT_FEATURES_LINK_PM_FEATURES");

                entity.HasOne(d => d.PmProject)
                    .WithMany(p => p.PmProjectFeaturesLink)
                    .HasForeignKey(d => d.PmProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PM_PROJECT_FEATURES_LINK_PM_PROJECTS");
            });

            modelBuilder.Entity<PmProjects>(entity =>
            {
                entity.HasKey(e => e.PmProjectId)
                    .HasName("PK_dbo.PM_PROJECTS");

                entity.ToTable("PM_PROJECTS");

                entity.Property(e => e.PmProjectId).HasColumnName("PM_PROJECT_ID");

                entity.Property(e => e.PmEpicAlias)
                    .HasColumnName("PM_EPIC_ALIAS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PmFeatureAlias)
                    .HasColumnName("PM_FEATURE_ALIAS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PmProjectIdLeadUser).HasColumnName("PM_PROJECT_ID_LEAD_USER");

                entity.Property(e => e.PmProjectLeadId).HasColumnName("PM_PROJECT_LEAD_ID");

                entity.Property(e => e.PmProjectName)
                    .HasColumnName("PM_PROJECT_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PmProjectTypeEnum).HasColumnName("PM_PROJECT_TYPE_ENUM");

                entity.Property(e => e.PmUsefeatures).HasColumnName("PM_USEFEATURES");
            });
        }
    }
}
