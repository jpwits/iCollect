using iCollect.enums;
using iCollect.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TGIS.Web.Models
{
    public class DatePoint
    {
        public DateTime x { get; set; }
        public int y { get; set; }
    }

    public class WardPercentage
    {
        public string Ward { get; set; }
        public int Percentage { get; set; }
    }

    public class ServiceStatus
    {
        public List<string> ServiceTypes { get; set; }

        public List<StatusTypeValue> StatusValues { get; set; }
    }

    public class StatusTypeValue
    {
        public string Status { get; set; }
        public List<int> ServiceValues { get; set; }
    }
}