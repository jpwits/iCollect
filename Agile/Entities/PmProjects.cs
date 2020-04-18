using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace IMIS.Web.DAL
{
    public partial class PmProjects
    {
        public PmProjects()
        {
            PmIssues = new HashSet<PmIssues>();
            PmProjectEpicLink = new HashSet<PmProjectEpicLink>();
            PmProjectFeaturesLink = new HashSet<PmProjectFeaturesLink>();
        }

        public int PmProjectId { get; set; }
        public string PmProjectName { get; set; }
        public int? PmProjectTypeEnum { get; set; }
        public bool? PmUsefeatures { get; set; }
        public int? PmProjectLeadId { get; set; }
        public int? PmProjectIdLeadUser { get; set; }
        public string PmEpicAlias { get; set; }
        public string PmFeatureAlias { get; set; }

        public virtual ICollection<PmIssues> PmIssues { get; set; }
        //[JsonIgnore]
        public virtual ICollection<PmProjectEpicLink> PmProjectEpicLink { get; set; }

        //[JsonIgnore]
        public virtual ICollection<PmProjectFeaturesLink> PmProjectFeaturesLink { get; set; }
    }
}
