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
    [Route("api/Collections"), Produces("application/json"), EnableCors("AppPolicy")]
    public class CollectionsController : Controller
    {
        private readonly NorthwindContext _context;

        public CollectionsController(NorthwindContext context)
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
            List<Collections> allCollections = new List<Collections>();
            int pageSize = length != null ? Convert.ToInt32(length) : 1;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            //Database query
            using (NorthwindContext dc = new NorthwindContext())
            {
                recordsTotal = dc.Collections.Count();
                allCollections = dc.Collections.OrderBy(a => a.Name).Skip(skip).Take(pageSize).ToList();
            }
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allCollections });
        }

        // GET: Collections
        [HttpGet, Route("GetCollections/{start}/{length}")]
        public List<Collections> GetCollections(int start, int length)
        {
            var qry = _context.Collections
                .Skip(start)
                .Take(length)
                .ToList();
            var idx = 0;

            return qry;
        }

        [HttpGet, Route("GetImage/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            if (id == 0)
            {
                return new JsonResult(new Items());
            }
            else
            {
                var current = _context.Items.FirstOrDefault(a => a.ImageId == id);
            }

            return new JsonResult(new Items());
        }

        [HttpGet, Route("GetSet/{id}")]
        public async Task<IActionResult> GetSet(int id)
        {
            var set = await _context.Collections
                .FirstOrDefaultAsync(m => m.CollectionId == id);

            return new JsonResult(set);
        }

      

        [HttpPut("Edit")]
        //[ValidateAntiForgeryToken]
        public async Task<int> Edit([FromBody] Collections data)
        {
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return rc;
        }

        // GET: Collections/Delete/5
        [HttpPost, Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var Collections = await _context.Collections
                .FirstOrDefaultAsync(m => m.CollectionId == id);
            if (Collections == null)
            {
                return NotFound();
            }

            return View(Collections);
        }
        // POST: Collections/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var Collections = await _context.Collections.FindAsync(id);
            _context.Collections.Remove(Collections);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CollectionsExists(int id)
        {
            return _context.Collections.Any(e => e.CollectionId == id);
        }
    }
}

