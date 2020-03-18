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


namespace iCollect.ControllersAPI
{
    [Route("api/SetsNg"), Produces("application/json"), EnableCors("AppPolicy")]
    public class SetsNgController : Controller
    {
        private readonly NorthwindContext _context;

        public SetsNgController(NorthwindContext context)
        {
            _context = context;
        }

     
        // GET: SetsNg
        [HttpGet, Route("GetSets/{start}/{length}")]
        public ActionResult GetSets(int start, int length)
        {
            var recordsTotal = _context.Sets.Count();
            var qry = _context.Sets
                .Include(a => a.Items)
                .ThenInclude(b => b.UserItems)
                .OrderByDescending(a => a.Description)
                .Skip(start)
                .Take(length)
                .ToList();

            return Json(new { recordsTotal = recordsTotal, data = qry });
        }

        [HttpGet, Route("GetUserItem/{id}")]
        public async Task<IActionResult> GetUserItem(int id)
        {
            var set = await _context.Sets
                .Include(a => a.Items)
                .ThenInclude(c => c.Images)
                .Include(a => a.Items)
                .ThenInclude(b => b.UserItems)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }
    }
}

