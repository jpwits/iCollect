using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using iCollect.NW.NW_Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iCollect.Models;

namespace iCollect.NW.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

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
            int pageSize =  length != null ? Convert.ToInt32(length) : 1;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            //Database query
            using (NorthwindContext dc = new NorthwindContext())
            {
                recordsTotal = dc.Sets.Count();
                allSets = dc.Sets.Include(a => a.SetImages).Skip(skip).Take(pageSize).ToList();

                foreach (var set in allSets)
                {
                    if (set.SetImages.Count > 0)
                    {
                        foreach (var setImg in set.SetImages)
                        {
                            if (setImg.Path != "NULL")
                            {
                                //Image image = Image.FromFile(setImg.Path);
                                Image image = Image.FromStream(new MemoryStream(setImg.Image));
                                Image thumb = image.GetThumbnailImage(120, 120, () => false, IntPtr.Zero);
                                setImg.Thumbnail = ImageToByteArray(thumb);
                            }
                        }
                    }
                }
            }
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allSets });
        }

        public byte[] ImageToByteArray(System.Drawing.Image imageIn)
        {
            using (var ms = new MemoryStream())
            {
                imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                return ms.ToArray();
            }
        }
    }
}