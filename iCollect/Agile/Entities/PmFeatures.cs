using System;
using System.Collections.Generic;

namespace IMIS.Web.DAL
{
    public partial class PmFeatures
    {
        public PmFeatures()
        {
            PmProjectFeaturesLink = new HashSet<PmProjectFeaturesLink>();
        }

        public int PmFeatureId { get; set; }
        public string PmFeatureName { get; set; }

        public virtual ICollection<PmProjectFeaturesLink> PmProjectFeaturesLink { get; set; }
    }
}
