﻿using System;
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

namespace iCollect.ControllersAPI
{
    [Route("api/Sets"), Produces("application/json"), EnableCors("AppPolicy")]
    public class SetsController : Controller
    {
        private readonly NorthwindContext _context;
       // private readonly ILogger _logger;

        public SetsController(NorthwindContext context/*, ILogger logger*/)
        {
            _context = context;
  //          _logger = logger;
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
                allSets = dc.Sets
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
                var current = _context.Items.Include(a=>a.Images).FirstOrDefault(a => a.ItemId == id);
            }

            return new JsonResult(new Items());
        }

      
        [HttpGet, Route("GetSet/{id}")]
        public async Task<IActionResult> GetSet(int id)
        {
            var set = await _context.Sets
                .Include(a => a.Items)
                .ThenInclude(b=>b.UserItems)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }
      
        [HttpPut("Edit")]
        //[ValidateAntiForgeryToken]
        public async Task<int> Edit([FromBody] Sets data)
        {
            try
            {
                if (data.Items.Count > 0)
                {
                    foreach (var setImg in data.Items)
                    {
                        if (setImg.Thumbnail == null)
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
            catch (Exception ex)
            {
               // _logger.LogError(ex, "Error occured on update set");
                throw new NotImplementedException(ex.Message);
            }
        }

        [HttpPut("updateUserItem")]
        //[ValidateAntiForgeryToken]
        public async Task<int> updateUserItem([FromBody] UserItems data)
        {

            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return rc;
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

    }
}

