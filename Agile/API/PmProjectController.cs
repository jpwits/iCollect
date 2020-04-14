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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMIS.Web.ControllersAPI
{
    [Route("api/PmProjects"), Produces("application/json"), EnableCors("AppPolicy")]
    public class PmProjectController : Controller
    {
        private IMISTestContext _ctx = null;
        public PmProjectController(IMISTestContext context)
        {
            _ctx = context;
        }

        // GET: api/PmProjects/GetProjects
        [HttpGet, Route("GetProjects")]
        public List<PmProjects> Get()
        {
            //var qry = from t in _ctx.PmProjects.Include(a => a.PmIssues) select t;
            var qry = from t in _ctx.PmProjects
                     .Include(prj => prj.PmProjectEpicLink)
                       .ThenInclude(prjEpic => prjEpic.PmEpic)
                     .Include(ftr => ftr.PmProjectFeaturesLink)
                       .ThenInclude(prjFtr => prjFtr.PmFeature)
                     .Include(iss => iss.PmIssues)
                      select t;
            return qry.ToList();
        }

        // GET api/PmProjects/GetProjects/5
        [HttpGet, Route("GetProjects/{id}")]
        public List<PmProjects> Get(int id)
        {
            var qry = from t in _ctx.PmProjects
                      .Include(prj => prj.PmProjectEpicLink)
                        .ThenInclude(prjEpic => prjEpic.PmEpic)
                      .Include(ftr => ftr.PmProjectFeaturesLink)
                        .ThenInclude(prjFtr => prjFtr.PmFeature)
                      .Include(iss=>iss.PmIssues)
                      select t;
            return qry.ToList();
        }

        // POST api/PmProjects/PostProjects
        [HttpPost, Route("PostProjects")]
        public async Task<object> PostProjects([FromBody]PmProjects model)
        {
            return null;
        }

        // PUT api/PmProjects/PutProjects/5
        [HttpPut, Route("PutProjects/{id}")]
        public async Task<object> PutProjects(int id, [FromBody]PmProjects model)
        {
            return null;
        }

        // DELETE api/PmProjects/DeleteProjectsByID/5
        [HttpDelete, Route("DeleteProjectsByID/{id}")]
        public async Task<object> DeleteProjectsByID(int id)
        {
            return null;
        }
    }
}
