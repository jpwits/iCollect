using System;
using System.Collections.Generic;

namespace IMIS.Web.DAL
{
    public partial class PmIssues
    {
        public int PmIssueId { get; set; }
        public int? PmProjectId { get; set; }
        public int? PmIssueType { get; set; }
        public int? PmEpicId { get; set; }
        public int? PmFeatureId { get; set; }
        public string PmTitle { get; set; }
        public string PmDescription { get; set; }
        public int? PmPriorityId { get; set; }
        public int? RelatedIssueId { get; set; }

        public virtual PmProjects PmProject { get; set; }
    }
}
