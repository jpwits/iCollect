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
using Microsoft.AspNetCore.Authorization;

namespace iCollect.Controllers
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
        //[HttpGet, Authorize]
        [HttpGet, Route("GetSets/{start}/{length}/{sortby}/{filterby}/{groupby}")]
        public ActionResult GetSets(int start, int length, string sortby, string filterby, string groupby)
        {
            // dynamic sortbyObj = Json.Decode(sortby);
            var sortbyObj = JsonConvert.DeserializeObject<dynamic>(sortby);
            var filterbyObj = JsonConvert.DeserializeObject<dynamic>(filterby);
            var groupbyObj = JsonConvert.DeserializeObject<dynamic>(groupby);
            var _sets = _context.Sets.AsEnumerable();
            var yrGroup = _sets.GroupBy(a => a.Year);
            var rangeGroup = _sets.GroupBy(a => a.Range).Select(a=> new { a.Key }).ToArray();
            string yrStartMin = yrGroup.FirstOrDefault().Key;
            string yrEndMax = yrGroup.OrderByDescending(a=>a.Key).FirstOrDefault().Key;
            var sortCol = sortbyObj.Columns;//.Select(a => a.Column.Value == sortbyObj.Active);
            var qry = _context.Sets.AsQueryable();
            
            foreach (var col in filterbyObj)
            {
                if (col.Column.Value == "Year") // Do for one column only 4 (the famous Jos) now.
                {
                    int yrStartSel = Convert.ToInt32(col.Start);
                    int yrEndSel = Convert.ToInt32(col.End);

                    qry = qry.Where(y => Convert.ToInt32(y.Year) >= yrStartSel && Convert.ToInt32(y.Year) <= yrEndSel);
                }
            }



            var recordsTotal = qry.Count();

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
                }
            }
            qry = qry.Skip(start)
                .Take(length);
            qry = qry
                .Include(a => a.Items)
                .ThenInclude(b => b.UserItems);

            var sets = qry
                .ToList();

            #region _temp
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

            //        if (set.Description.Contains("1 Oz") ||
            //            set.Description.Contains("H Oz") || 
            //            set.Description.Contains("Q Oz") || 
            //            set.Description.Contains("T Oz") ||
            //            set.Description.Contains("5c") ||
            //            set.Description.Contains("10c") ||
            //            set.Description.Contains("20c") ||
            //            set.Description.Contains("50c") ||
            //            set.Description.Contains("R1") ||
            //            set.Description.Contains("R2") ||
            //            set.Description.Contains("R5") ||
            //            set.Description.Contains("R10") ||
            //            set.Description.Contains("R25"))
            //        {
            //            set.SetType = "Coin";
            //        }
            //        else if (set.Description.Contains("Launch"))
            //        {
            //            set.SetType = "SetType";
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

            //        else
            //        {

            //        }
            //    }
            //}
            #endregion

            return Json(new { recordsTotal = recordsTotal, yrstartmin = yrStartMin, yrendmax = yrEndMax, rangeGroup = rangeGroup, data = sets });
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

