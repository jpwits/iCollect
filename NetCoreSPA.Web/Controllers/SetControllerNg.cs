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


#if false
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

        //public byte[] ImageToByteArray(System.Drawing.Image imageIn)
        //{
        //    using (var ms = new MemoryStream())
        //    {
        //        imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        //        return ms.ToArray();
        //    }
        //}

        // GET: SetsNg
        [HttpGet, Route("GetSetsNg/{start}/{length}")]
        public List<SetsNg> GetSetsNg(int start, int length)
        {
            var qry = _context.SetsNg
                .Include(a => a.Items)
                .Skip(start)
                .Take(length)
                .ToList();
            var idx = 0;
            //foreach (var set in qry)
            //{
            //    if (set.items.Count > 0)
            //    {
            //        foreach (var setImg in set.items)
            //        {
            //            if (setImg.Path != "NULL")
            //            {
            //                Image image = Image.FromFile(setImg.Path);
            //                Image thumb = image.GetThumbnailImage(120, 120, () => false, IntPtr.Zero);
            //                setImg.Thumbnail = ImageToByteArray(thumb,"image/unk");
            //            }
            //        }
            //    }
            //    idx++;
            //}

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
                var current = _context.Items.Include(a => a.Images).FirstOrDefault(a => a.ItemId == id);
            }

            return new JsonResult(new Items());
        }

        public byte[] ImageToByteArray(System.Drawing.Image imageIn, string type)
        {
            using (var ms = new MemoryStream())
            {
                if (type == "image/gif")
                {
                    imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
                }
                else
                {
                    imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                }
                return ms.ToArray();
            }
        }

        [HttpGet, Route("GetSet/{id}")]
        public async Task<IActionResult> GetSet(int id)
        {
            var set = await _context.SetsNg
                .Include(a => a.Items)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }

        // GET: SetsNg/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: SetsNg/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SetId,PmSetName")] SetsNg SetsNg)
        {
            if (ModelState.IsValid)
            {
                _context.Add(SetsNg);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(SetsNg);
        }

        //[HttpPut("Edit/{id}")]
        [HttpPut("Edit")]
        //[ValidateAntiForgeryToken]
        // GET: SetsNg/Edit/5
        // public async Task<int> Edit(int id)//, [FromBody] SetsNg SetsNg)
        public async Task<int> Edit([FromBody] SetsNg data)
        {
            if (data.Items.Count > 0)
            {
                foreach (var setImg in data.Items)
                {
                    if (setImg.Thumbnail != null)
                    {
                        Image image = Image.FromStream(new MemoryStream(setImg.Image));

                        double aspect = (double)image.Width / image.Height;
                        var height = Convert.ToInt32(120 / aspect);

                        Image thumb = image.GetThumbnailImage(120, height, () => false, IntPtr.Zero);
                        setImg.Thumbnail = ImageToByteArray(thumb, setImg.Type);
                    }
                }
            }

            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return rc;
        }

        // GET: SetsNg/Delete/5
        [HttpPost, Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var SetsNg = await _context.SetsNg
                .FirstOrDefaultAsync(m => m.SetId == id);
            if (SetsNg == null)
            {
                return NotFound();
            }

            return View(SetsNg);
        }
        // POST: SetsNg/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var SetsNg = await _context.SetsNg.FindAsync(id);
            _context.SetsNg.Remove(SetsNg);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SetsNgExists(int id)
        {
            return _context.SetsNg.Any(e => e.SetId == id);
        }
    }
}

#endif