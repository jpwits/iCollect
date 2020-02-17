﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using iCollect.NW.NW_Entities;
using System.IO;
using System.Drawing;
using Microsoft.IdentityModel.Xml;
using System.Text;
using Newtonsoft.Json;

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

        // GET: Sets
        [HttpGet, Route("GetSets/{start}/{length}")]
        public List<Sets> Index(int start, int length)
        {
            var qry = _context.Sets
                .Include(a=>a.SetImages)
                .Skip(start)
                .Take(length)
                .ToList();
            var idx = 0;
            foreach (var set in qry)
            {
                if (set.SetImages.Count > 0)
                {
                    foreach (var setImg in set.SetImages)
                    {
                        if (setImg.Path != "NULL")
                        {
                            Image image = Image.FromFile(setImg.Path);
                            Image thumb = image.GetThumbnailImage(120, 120, () => false, IntPtr.Zero);
                            setImg.Thumbnail = ImageToByteArray(thumb);
                        }
                    }
                }
                idx++;
                //if (idx > 100)
                //{
                //    break;
                //}
            }

            return qry;
        }

        [HttpGet, Route("GetImage/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            if (id == 0)
            {
                return new JsonResult(new SetImages());
            }
            else
            {
                var current = _context.SetImages.FirstOrDefault(a => a.ImageId == id);
            }

            return new JsonResult(new SetImages());
        }

        [HttpPut, Route("UploadFiles/{id}")]
        public async Task<IActionResult> UploadFiles(int id, [FromBody] string files)
        {
            var newset = _context.Sets.FirstOrDefault();
            return new JsonResult(new Images());
        }

        public byte[] ImageToByteArray(System.Drawing.Image imageIn)
        {

            using (var ms = new MemoryStream())
            {
                imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
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

       
        [HttpGet("GetSet/{id}")]
        //[HttpGet("Details/{id}")]
        //[HttpGet("{id}"), Route("Details")]
        public async Task<IActionResult> Details(int id)
        {
            if (id == 0)
            {
                var newset = _context.Sets.FirstOrDefault();
                return new JsonResult(newset);
            }

            var set = await _context.Sets
                .Include(a => a.SetImages)
                .FirstOrDefaultAsync(m => m.SetId == id);
            //if (set == null)
            //{
            //    return NotFound();
            //}
            //else
            //{
            //    if (set.SetImages.Count > 0)
            //    {
            //        foreach (var setImg in set.SetImages)
            //        {
            //            if (setImg.Path != "NULL")
            //            {
            //                setImg.Image = ImageToByteArray(Image.FromFile(setImg.Path));
            //            }
            //        }
            //    }
            //}
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
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return rc;
        }

        // POST: Sets/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPut]
        // [ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, /*[Bind("setId")]*/ [FromBody] Sets sets)
        //{
        //    if (id != ((Sets)sets).SetId)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update((Sets)sets);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!SetsExists(((Sets)sets).SetId))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(sets);
        //}

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

        //public static byte[] GetBytesFromFile(string fullFilePath)
        //{
        //    // this method is limited to 2^32 byte files (4.2 GB)

        //    FileStream fs = File.OpenRead(fullFilePath);
        //    try
        //    {
        //        byte[] bytes = new byte[fs.Length];
        //        fs.Read(bytes, 0, Convert.ToInt32(fs.Length));
        //        fs.Close();
        //        return bytes;
        //    }
        //    finally
        //    {
        //        fs.Close();
        //    }

        //}

        // GET: Sets/Details/5

    }
}
