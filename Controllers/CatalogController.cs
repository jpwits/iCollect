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

namespace iCollect.Controllers
{
    [Route("api/Catalog"), Produces("application/json"), EnableCors("AppPolicy")]
    public class CatalogController : Controller
    {
        private readonly icollectdbContext _context;

        public CatalogController(icollectdbContext context)
        {
            _context = context;
        }

        //[HttpPost, Route("getData")]
        //public ActionResult getData()
        //{
        //    //Datatable parameter
        //    var draw = Request.Form.Where(a => a.Key == "draw").Select(b => b.Value).FirstOrDefault()[0];
        //    //paging parameter
        //    var start = Request.Form.Where(a => a.Key == "start").Select(b => b.Value).FirstOrDefault()[0];
        //    var length = Request.Form.Where(a => a.Key == "length").Select(b => b.Value).FirstOrDefault()[0];
        //    //sorting parameter
        //    //var sortColumn = Request.Form.Select(a => a.Key == "columns[" + Request.Form.Select(ab => ab.Key == "order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
        //    //var sortColumnDir = Request.Form.Select(a => a.Key == "order[0][dir]").FirstOrDefault();
        //    //filter parameter
        //    //var searchValue = Request.Form.Select(a => a.Key == "search[value]").FirstOrDefault();
        //    List<Catalog> allCatalogs = new List<Catalog>();
        //    int pageSize = length != null ? Convert.ToInt32(length) : 1;
        //    int skip = start != null ? Convert.ToInt32(start) : 0;
        //    int recordsTotal = 0;
        //    //Database query
        //    using (icollectdbContext dc = new icollectdbContext())
        //    {
        //        recordsTotal = dc.Catalog.Count();
        //        allCatalogs = dc.Catalog.OrderBy(a => a.Name).Skip(skip).Take(pageSize).ToList();
        //    }
        //    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allCatalogs });
        //}

        // GET: Catalogs
        [HttpGet, Route("GetCatalogs")]
        public ActionResult GetCatalogs()
        {
            var qry = _context.Catalog.Include(a=>a.CatalogType)
                .ToList();

            return Json(new { data = qry });
        }

        [HttpGet, Route("GetCatalog/{id}")]
        public async Task<IActionResult> GetCatalog(int id)
        {
            var set = await _context.Catalog
                .FirstOrDefaultAsync(m => m.CatalogId == id);

            return new JsonResult(set);
        }

        [HttpPut("updateCatalog")]
        //[ValidateAntiForgeryToken]
        public async Task<int> updateCatalog([FromBody] Catalog data)
        {
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return rc;
        }

        [HttpGet, Route("getCatalogTypes")]
        public ActionResult GetCatalogTypes()
        {
            var qry = _context.CatalogTypes
                .ToList();

            return Json(new { data = qry });
        }

    }
}

