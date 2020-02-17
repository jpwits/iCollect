using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iCollect.NW.NW_Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TGIS.Web.Controllers
{
    [Route("api/Pulse"), Produces("application/json"), EnableCors("AppPolicy")]
    public class PulseController : Controller
    {
        private NorthwindContext _ctx = null;
        public PulseController(NorthwindContext context)
        {
            _ctx = context;
        }


        // GET: api/Pulse/GetPulse
        [HttpGet, Route("GetPulse")]
        public string Get()
        {
            return "TGIS API v 1.0 : Status - Active";
        }
    }
}
