using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TGIS.Web.Entities;
using IMIS.Web.DAL;
using Atlassian.Connect;

// For more information on enabling Web API for empty Features, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMIS.Web.ControllersAPI
{
    [Route("api/PmFeatures"), Produces("application/json"), EnableCors("AppPolicy")]
    public class PmFeatureController : Controller
    {
        private IMISTestContext _ctx = null;
        public PmFeatureController(IMISTestContext context)
        {
            _ctx = context;
        }

        // GET: api/PmFeatures/GetFeatures
        [HttpGet, Route("GetFeatures")]
        public List<PmFeatures> Get()
        {
            var qry = from t in _ctx.PmFeatures select t;
            return qry.ToList();
        }

        // GET api/PmFeatures/GetUserByID/5
        [HttpGet, Route("GetFeatures/{id}")]
        public List<PmFeatures> Get(int id)
        {
            var qry = from t in _ctx.PmFeatures  select t;
            return qry.ToList();
        }

        // POST api/PmFeatures/PostUser
        [HttpPost, Route("PostUser")]
        public async Task<object> PostUser([FromBody]User model)
        {
            return null;
        }

        // PUT api/PmFeatures/PutUser/5
        [HttpPut, Route("PutUser/{id}")]
        public async Task<object> PutUser(int id, [FromBody]User model)
        {
            return null;
        }

        // DELETE api/PmFeatures/DeleteUserByID/5
        [HttpDelete, Route("DeleteUserByID/{id}")]
        public async Task<object> DeleteUserByID(int id)
        {
            return null;
        }
    }
}
