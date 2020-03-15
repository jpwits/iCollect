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
    [Route("api/Sets"), Produces("application/json"), EnableCors("AppPolicy")]
    public class SetsController : Controller
    {
        private readonly NorthwindContext _context;

        public SetsController(NorthwindContext context)
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
            using (NorthwindContext dc = new NorthwindContext())
            {
                recordsTotal = dc.Sets.Count();
                allSets = dc.Sets.Include(a => a.Items).OrderByDescending(a => a.Description).Skip(skip).Take(pageSize).ToList();
            }
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allSets });
        }

        
        //public byte[] ImageToByteArray(System.Drawing.Image imageIn)
        //{
        //    using (var ms = new MemoryStream())
        //    {
        //        imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        //        return ms.ToArray();
        //    }
        //}

            // GET: Sets
        [HttpGet, Route("GetSets/{start}/{length}")]
        public List<Sets> GetSets(int start, int length)
        {
            var qry = _context.Sets
                .Include(a=>a.Items)
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
                var current = _context.Items.Include(a=>a.Images).FirstOrDefault(a => a.ItemId == id);
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



        byte[] FileToImage(string path)
        {
            // Load file meta data with FileInfo
            FileInfo fileInfo = new FileInfo(path);

            // The byte[] to save the data in
            byte[] data = new byte[fileInfo.Length];

            // Load a filestream and put its content into the byte[]
            using (FileStream fs = fileInfo.OpenRead())
            {
                fs.Read(data, 0, data.Length);
            }

            // Delete the temporary file
            //fileInfo.Delete();

            return data;
            // Post byte[] to database
        }

        [HttpGet, Route("GetSet/{id}")]
        public async Task<IActionResult> GetSet(int id)
        {
            var set = await _context.Sets
                .Include(a => a.Items)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }

        // GET: Sets/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Sets/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SetId,PmSetName")] Sets Sets)
        {
            if (ModelState.IsValid)
            {
                _context.Add(Sets);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(Sets);
        }

        //[HttpPut("Edit/{id}")]
        [HttpPut("Edit")]
        //[ValidateAntiForgeryToken]
        // GET: Sets/Edit/5
       // public async Task<int> Edit(int id)//, [FromBody] Sets sets)
        public async Task<int> Edit([FromBody] Sets data)
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

        // GET: Sets/Delete/5
        [HttpPost, Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var Sets = await _context.Sets
                .FirstOrDefaultAsync(m => m.SetId == id);
            if (Sets == null)
            {
                return NotFound();
            }

            return View(Sets);
        }
        // POST: Sets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var Sets = await _context.Sets.FindAsync(id);
            _context.Sets.Remove(Sets);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SetsExists(int id)
        {
            return _context.Sets.Any(e => e.SetId == id);
        }
    }
}

