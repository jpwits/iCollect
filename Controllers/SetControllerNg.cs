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
using Microsoft.AspNetCore.Authorization;
using Z.EntityFramework.Plus;
using Newtonsoft.Json.Linq;

namespace iCollect.Controllers
{
    [Route("api/SetsNg"), Produces("application/json"), EnableCors("AppPolicy")]
    public class SetsNgController : Controller
    {
        private readonly icollectdbContext _context;

        public SetsNgController(icollectdbContext context)
        {
            _context = context;
        }

        [HttpGet, Route("GetLookups")]
        public ActionResult GetLookups()
        {
            var _sets = _context.Sets.AsEnumerable();
            var yrGroup = _sets.GroupBy(a => a.Year);
            var rangeGroup = _sets.GroupBy(a => a.Range).Select(a => new { a.Key }).ToList();
            var typeGroup = _sets.GroupBy(a => a.SetType).Select(a => new { a.Key }).ToList();
            return Json(new
            {
                rangeGroup,
                typeGroup,
            });
        }

        [Authorize]
        [HttpPut, Route("GetSets/{start}/{length}/{sortby}/{filterbyYear}/{filterbyRanges}/{filterbySetTypes}/{groupby}/{albumId}")]
        public ActionResult GetSets([FromBody] int start, int length, string sortby,string filterbyYear, string filterbyRanges, string filterbySetTypes, string groupby, int albumId)
        {
            // dynamic sortbyObj = Json.Decode(sortby);
            var sortbyObj = JsonConvert.DeserializeObject<dynamic>(sortby);
            var filterbyYearObj = JsonConvert.DeserializeObject<dynamic>(filterbyYear);
            var filterbyRangesObj = JsonConvert.DeserializeObject<dynamic>(filterbyRanges);
            var filterbySetTypesObj = JsonConvert.DeserializeObject<dynamic>(filterbySetTypes);
            var groupbyObj = JsonConvert.DeserializeObject<dynamic>(groupby);
            var yrGroup = _context.Sets.AsEnumerable().GroupBy(a => a.Year);
            int dtMin = yrGroup.FirstOrDefault().Key ?? 1987;
            int yrEndMax = yrGroup.OrderByDescending(a => a.Key).FirstOrDefault().Key ?? 2015;
            var sortCol = sortbyObj.Columns;
            var qry = _context.Sets.AsQueryable();

            qry = filterQry(qry, filterbyYearObj, filterbyRangesObj, filterbySetTypesObj);
            var recordsTotal = qry.Count();

            qry = sortQry(qry, sortbyObj);

            qry = qry.Skip(start)
                .Take(length)
                .Include(a => a.Items);

            var qryTake = qry.ToList();

            var qryUser = from sets in qryTake
                          join items in _context.Items on sets.SetId equals items.SetId
                          join userItems in _context.UserItems on items.ItemId equals userItems.ItemId
                          where (userItems.UserId == User.Identity.Name)// && userItems.AlbumId == albumId)
                          select sets;
            var qryUserTake = qryUser.ToList();

            var qryComb = qryTake.Union(qryUserTake);
            qryComb = sortQry(qryComb.AsQueryable(), sortbyObj);
            var qryRes = qryComb.ToList();

            //oneTimeTemp();

            return Json(new
            {
                recordsTotal = recordsTotal,
                yrstartmin = dtMin,
                yrendmax = yrEndMax,
                data = qryRes
            });
        }

        public IQueryable filterQry(IQueryable<Sets> qry, dynamic filterbyYearObj, dynamic filterbyRangesObj, dynamic filterbySetTypesObj)
        {
            int yrStartSel = ((DateTime)filterbyYearObj.Start).Year;
            int yrEndSel = ((DateTime)filterbyYearObj.End).Year;
            qry = qry.Where(y => y.Year >= yrStartSel && y.Year < yrEndSel + 1);

            var rangefilter = new List<string>();
            foreach (var range in filterbyRangesObj)
            {
                rangefilter.Add(range.Value);
            }

            var setTypesfilter = new List<string>();
            foreach (var setType in filterbySetTypesObj)
            {
                setTypesfilter.Add(setType.Value);
            }
            qry = qry.Where(y => setTypesfilter.Contains(y.SetType));
            qry = qry.Where(y => rangefilter.Contains(y.Range) && setTypesfilter.Contains(y.SetType)); 

            return qry;
        }
        public IQueryable sortQry(IQueryable<Sets> qry, dynamic sortbyObj)
        {
            foreach (var col in sortbyObj.Columns)
            {
                if (sortbyObj.Active.Value == col.Column.Value) // Do for one column only 4 (the famous Jos) now.
                {
                    if (col.Column.Value == "Description")
                    {
                        if (col.Direction.Value == "Descending")
                        {
                            qry = qry.OrderByDescending(a => a.Description);
                        }
                        else
                        {
                            qry = qry.OrderBy(a => a.Description);
                        }
                    };
                    if (col.Column.Value == "Year")
                    {
                        if (col.Direction.Value == "Descending")
                        {
                            qry = qry.OrderByDescending(a => a.Year);
                        }
                        else
                        {
                            qry = qry.OrderBy(a => a.Year);
                        }
                    };
                    if (col.Column.Value == "Range")
                    {
                        if (col.Direction.Value == "Descending")
                        {
                            qry = qry.OrderByDescending(a => a.Range);
                        }
                        else
                        {
                            qry = qry.OrderBy(a => a.Range);
                        }
                    };
                    if (col.Column.Value == "SetType")
                    {
                        if (col.Direction.Value == "Descending")
                        {
                            qry = qry.OrderByDescending(a => a.SetType);
                        }
                        else
                        {
                            qry = qry.OrderBy(a => a.SetType);
                        }
                    };
                }
            }
            return qry;
        }


        public void oneTimeTemp()
        {
            // OneTime Updates
            //foreach (var set in sets)
            //{
            //    if (set.Description != null)
            //    {
            //        set.Date = new DateTime(Convert.ToInt32(set.Description.Split(" ")[0]), 1, 1);
            //        set.Year = set.Description.Split(" ")[0];
            //        if (set.Description.Contains("Kruger"))
            //        {
            //            set.Range = "Kruggerrand";
            //        }
            //        else if (set.Description.Contains("Protea") || set.Description.Contains("WINE"))
            //        {
            //            set.Range = "Protea";
            //        }
            //        else if (set.Description.Contains("Mandela"))
            //        {
            //            set.Range = "NelsonMandela";
            //        }
            //        else if (set.Description.Contains("Union"))
            //        {
            //            set.Range = "UnionBuildings";
            //        }
            //        else if (set.Description.Contains("Pollinators"))
            //        {
            //            set.Range = "Pollinators";
            //        }
            //        else if (set.Description.Contains("Trains"))
            //        {
            //            set.Range = "Trains";
            //        }
            //        else if (set.Description.Contains("Currency Proof"))
            //        {
            //            set.Range = "CurrencyProof";
            //        }
            //        else if (set.Description.Contains("Natura"))
            //        {
            //            set.Range = "Natura";
            //        }
            //        else if (set.Description.Contains("World Cup") ||
            //            set.Description.Contains("Soccer") ||
            //            set.Description.Contains("Olympic") ||
            //            set.Description.Contains("Rugby") ||
            //            set.Description.Contains("Cricket"))
            //        {
            //            set.Range = "Sport";
            //        }
            //        else if (set.Description.Contains("Cultural"))
            //        {
            //            set.Range = "Cultural";
            //        }
            //        else if (set.Description.Contains("Maritime") || set.Description.Contains("Marine"))
            //        {
            //            set.Range = "Maritime";
            //        }
            //        else if (set.Description.Contains("Heritage"))
            //        {
            //            set.Range = "Heritage";
            //        }
            //        else if (set.Description.Contains("Cultural"))
            //        {
            //            set.Range = "Cultural";
            //        }
            //        else if (set.Description.Contains("Wildlife") || set.Description.Contains("Transfrontier"))
            //        {
            //            set.Range = "PeacePark";
            //        }
            //        else if (set.Description.Contains("Bird"))
            //        {
            //            set.Range = "Bird";
            //        }
            //        else if (set.Description.Contains("Oom Paul"))
            //        {
            //            set.Range = "OomPaul";
            //        }
            //        else if (set.Description.Contains("Polar"))
            //        {
            //            set.Range = "Polar";
            //        }
            //        else if (set.Description.Contains("SARB"))
            //        {
            //            set.Range = "SARB";
            //        }
            //        else if (set.Description.Contains("WWF"))
            //        {
            //            set.Range = "WWF";
            //        }
            //        else
            //        {

            //        }

            //        if (set.Description.Contains("1 Oz"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("H Oz"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("Q Oz"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("T Oz"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("5c"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("10c"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("20c"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("50"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R1") || set.Description.Contains("1R"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R2"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R5"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R10"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R20"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R20"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R50"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R100"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        if (set.Description.Contains("R200"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        else if (set.Description.Contains("Launch"))
            //        {
            //            set.SetType = "Launch";
            //        }
            //        else if (set.Description.Contains("Certified"))
            //        {
            //            set.SetType = "Certified";
            //        }
            //        else if (set.Description.Contains("GRC"))
            //        {
            //            set.SetType = "GRC";
            //            set.Range = "Kruggerrand";
            //        }
            //        else if (set.Description.Contains("Prestige"))
            //        {
            //            set.SetType = "PrestigeSet";
            //        }
            //        else if (set.Description.Contains("Proof"))
            //        {
            //            set.SetType = "ProofSet";
            //        }
            //        else if (set.Description.Contains("Set"))
            //        {
            //            set.SetType = "ProofSet";
            //        }
            //        else if (set.Description.Contains("Collectors"))
            //        {
            //            set.SetType = "Collectors";
            //        }
            //        else if (set.Description.Contains("Special"))
            //        {
            //            set.SetType = "Special";
            //        }
            //        else
            //        {
            //        }
            //    }
            //}
            //_context.UpdateRange(sets);
            //_context.SaveChangesAsync();
        }

        [HttpGet, Route("GetSet/{id}")]
        public async Task<IActionResult> GetSet(int id)
        {
            var set = await _context.Sets
                .Include(a => a.Items)
                .ThenInclude(c => c.ImageIdANavigation)
                .Include(a => a.Items)
                .ThenInclude(c => c.ImageIdBNavigation)
                .Include(a => a.Items)
                .ThenInclude(b => b.UserItems)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }

        [HttpGet, Route("GetUserItem/{id}")]
        public IActionResult GetUserItem(int id)
        {
            var set = _context.Sets
                .Include(a => a.Items)
                .ThenInclude(c => c.ImageIdANavigation)
                .Include(a => a.Items)
                .ThenInclude(b => b.UserItems)
                .FirstOrDefaultAsync(m => m.SetId == id);

            return new JsonResult(set);
        }

        [HttpPut("updateSet")]
        //[ValidateAntiForgeryToken]
        public async Task<Sets> updateSet([FromBody] Sets data)
        {
            try
            {
                if (data.Items.Count > 0)
                {
                    foreach (var item in data.Items)
                    {
                        if (item.ThumbnailA == null && item.ImageIdANavigation != null)
                        {
                            Image imageA = Image.FromStream(new MemoryStream(item.ImageIdANavigation.Image));
                            double aspectA = (double)imageA.Width / imageA.Height;
                            var heightA = Convert.ToInt32(120 / aspectA);
                            Image thumbA = imageA.GetThumbnailImage(120, heightA, () => false, IntPtr.Zero);
                            item.ThumbnailA = ImageToByteArray(thumbA, item.Type);
                        }
                        if (item.ThumbnailB == null && item.ImageIdBNavigation != null)
                        {
                            Image imageB = Image.FromStream(new MemoryStream(item.ImageIdBNavigation.Image));
                            double aspectB = (double)imageB.Width / imageB.Height;
                            var heightB = Convert.ToInt32(120 / aspectB);
                            Image thumbB = imageB.GetThumbnailImage(120, heightB, () => false, IntPtr.Zero);
                            item.ThumbnailB = ImageToByteArray(thumbB, item.Type);
                        }
                    }
                }

                _context.Update(data);
                int rc = await _context.SaveChangesAsync();

                return data;
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

