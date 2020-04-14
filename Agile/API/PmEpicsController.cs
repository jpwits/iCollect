using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using iCollect.NW_Entities;
using Microsoft.AspNetCore.Cors;

namespace iCollect.ControllersAPI
{
    [Route("api/PmEpics"), Produces("application/json"), EnableCors("AppPolicy")]
    public class PmEpicsController : Controller
    {
        private readonly NorthwindContext _context;

        public PmEpicsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: PmEpics
        [HttpGet, Route("GetEpics")]
        public List<PmEpics> Index()
        {
            var qry = _context.PmEpics.ToList();
            return qry.ToList();
        }

        // GET: PmEpics/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pmEpics = await _context.PmEpics
                .FirstOrDefaultAsync(m => m.PmEpicId == id);
            if (pmEpics == null)
            {
                return NotFound();
            }

            return View(pmEpics);
        }

        // GET: PmEpics/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PmEpics/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("PmEpicId,PmEpicName")] PmEpics pmEpics)
        {
            if (ModelState.IsValid)
            {
                _context.Add(pmEpics);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(pmEpics);
        }

        // GET: PmEpics/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pmEpics = await _context.PmEpics.FindAsync(id);
            if (pmEpics == null)
            {
                return NotFound();
            }
            return View(pmEpics);
        }

        // POST: PmEpics/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("PmEpicId,PmEpicName")] PmEpics pmEpics)
        {
            if (id != pmEpics.PmEpicId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(pmEpics);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PmEpicsExists(pmEpics.PmEpicId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(pmEpics);
        }

        // GET: PmEpics/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pmEpics = await _context.PmEpics
                .FirstOrDefaultAsync(m => m.PmEpicId == id);
            if (pmEpics == null)
            {
                return NotFound();
            }

            return View(pmEpics);
        }

        // POST: PmEpics/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var pmEpics = await _context.PmEpics.FindAsync(id);
            _context.PmEpics.Remove(pmEpics);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PmEpicsExists(int id)
        {
            return _context.PmEpics.Any(e => e.PmEpicId == id);
        }
    }
}
