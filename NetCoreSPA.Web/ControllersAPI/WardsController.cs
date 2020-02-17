using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iCollect.NW.NW_Entities;
using iCollect.enums;
using TGIS.Web.Models;
using Microsoft.AspNetCore.Cors;
using iCollect.Enums;
using System.Net.Http;
using System.Text;

namespace iCollect.ControllersAPI
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class WardsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public WardsController(NorthwindContext context)
        {
            _context = context;
        }

        [HttpGet("{from, to, qtype, stype}"), Route("api/[controller]/GetWardPercentages")]
        public async Task<List<List<object>>> GetWardPercentages(DateTime from, DateTime to, QueryTypeEnum qtype = 0, ServiceTypeEnum stype = 0)
        {
#warning Think we can ignore stype here...check
            if (qtype == QueryTypeEnum.CallsPerTownWard)
            {
                var wards = await GetWardNames();
                return new List<List<object>>()
                {
                    new List<object>(){ wards[0], 30},
                    new List<object>(){ wards[1], 25},
                    new List<object>(){ wards[2], 15},
                    new List<object>(){ wards[3], 15},
                    new List<object>(){ wards[4], 5},
                    new List<object>(){ wards[5], 5},
                    new List<object>(){ wards[6], 5},

                };
            }
            ///This needs to go to Service Controller
            else if (qtype == QueryTypeEnum.CallsPerService)
            {
                return new List<List<object>>()
                {
                    new List<object>(){"Parks and Recreation", 40},
                    new List<object>(){"Traffic", 15},
                    new List<object>(){"Pavement", 10 },
                    new List<object>(){"Community Facilities", 6},
                    new List<object>(){"Law Enforcement", 6},
                    new List<object>(){"Roads", 6 },
                    new List<object>(){"Storm Water", 6},
                    new List<object>(){"Town Planning", 6}
                };
            }
            //Needs to go to Category Controller
            else if (qtype == QueryTypeEnum.CallsPerCategory)
            {
                return new List<List<object>>()
                {
                    new List<object>(){"Grass Growing in Tar Road/Sidewalk", 40 },
                    new List<object>(){"Cleaning of vacant stands", 15},
                    new List<object>(){"Noise pollution", 15},
                    new List<object>(){"Other", 15},
                    new List<object>(){"Pavement Uneven", 15 },
                };
            }
            else
            {
                return new List<List<object>>()
                {
                    new List<object>()
                };
            }
        }

        [HttpGet, Route("GetWardNames")]
        public async Task<List<object>> GetWardNames()
        {
            return new List<object>()
                {
                    "Piketberg Ward 3",
                    "Velddrif Ward 7", 
                    "Aurora/Noordhoek Ward 6", 
                    "Piketberg Ward 4",
                    "Porterville Ward 1",
                    "Porterville Ward 2",
                    "Dwarskersbos Ward 6"
                };
        }
    }
}
