using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iCollect.Enums
{
#warning : This should not even exist - query must be a combo of dimensions - l8r!
    public enum QueryTypeEnum
    {
        CallsLogged,
        TotalCallsRegistered,
        TotalCallsCurrent,
        TotalCallsCompleted,
        CallsPerTownWard,
        CallsPerService,
        CallsPerCategory,
        CallsPerTownPerMonth,
//        CallsPerServicePerStatus,
    }

    public enum StatusTypeEnum
    {
        New,
        InProgress,
        Complete
    }

    // for l8r!
    //public enum Dimensions
    //{
    //    Area, //col of location
    //    Service, //4 now,
    //    Category, //Implied
    //    Time,
    //    ....
    //}
}