using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using iCollect.Entities;
using System.IO;
using System.Drawing;
using System.Text;
using Newtonsoft.Json;
using System.Drawing.Imaging;
using Microsoft.Extensions.Logging;

namespace iCollect.Controllers
{
    [Route("api/Sets"), Produces("application/json"), EnableCors("AppPolicy")]
    public class SetsController : Controller
    {
        private readonly icollectdbContext _context;

        public SetsController(icollectdbContext context)
        {
            _context = context;
        }

        [HttpPost, Route("getData")]
        public ActionResult getData()
        {
            //Datatable parameter
            var draw = Request.Form.Where(a => a.Key == "draw").Select(b => b.Value).FirstOrDefault()[0];
         
            //paging parameter
            var start = Request.Form.Where(a => a.Key == "start").Select(b => b.Value).FirstOrDefault()[0];
            var length = Request.Form.Where(a => a.Key == "length").Select(b => b.Value).FirstOrDefault()[0];

            //sorting parameter
            //var sortColumn = Request.Form.Select(a => a.Key == "columns[" + Request.Form.Select(ab => ab.Key == "order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            //var sortColumnDir = Request.Form.Select(a => a.Key == "order[0][dir]").FirstOrDefault();
            //filter parameter
            //var searchValue = Request.Form.Select(a => a.Key == "search[value]").FirstOrDefault();
            List<Sets> allSets = new List<Sets>();
            int pageSize = length != null ? Convert.ToInt32(length) : 1;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            //Database query
            using (icollectdbContext dc = new icollectdbContext())
            {
                recordsTotal = dc.Sets.Count();
                allSets = dc.Sets
                    //.Include(a => a.Items)
                    //.ThenInclude(c=>c.Images)
                    .Include(a => a.Items)
                    .ThenInclude(b => b.UserItems)
                    .OrderByDescending(a => a.Description)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();
            }
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allSets });
        }

        
        // GET: Sets
       
        [HttpGet, Route("GetImage/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            if (id == 0)
            {
                return new JsonResult(new Items());
            }
            else
            {
               // var current = _context.Items.Include(a=>a.Images).FirstOrDefault(a => a.ItemId == id);
            }

            return new JsonResult(new Items());
        }


      

    }
}

