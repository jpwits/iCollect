using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IMIS.Web.DAL;
using Microsoft.AspNetCore.Cors;

namespace IMIS.Web.ControllersAPI
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class PmIssuesController : ControllerBase
    {
        private readonly IMISTestContext _context;

        public PmIssuesController(IMISTestContext context)
        {
            _context = context;
        }

        // GET: api/PmIssues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PmIssues>>> GetPmIssues()
        {
            return await _context.PmIssues.ToListAsync();
        }

        // GET: api/PmIssues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PmIssues>> GetPmIssues(int id)
        {
            var pmIssues = await _context.PmIssues.FindAsync(id);

            if (pmIssues == null)
            {
                return NotFound();
            }

            return pmIssues;
        }

        // PUT: api/PmIssues/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPmIssues(int id, PmIssues pmIssues)
        {
            if (id != pmIssues.PmIssueId)
            {
                return BadRequest();
            }

            _context.Entry(pmIssues).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PmIssuesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PmIssues
        [HttpPost]
        public async Task<ActionResult<PmIssues>> PostPmIssues(PmIssues pmIssues)
        {
            _context.PmIssues.Add(pmIssues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPmIssues", new { id = pmIssues.PmIssueId }, pmIssues);
        }

        // DELETE: api/PmIssues/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PmIssues>> DeletePmIssues(int id)
        {
            var pmIssues = await _context.PmIssues.FindAsync(id);
            if (pmIssues == null)
            {
                return NotFound();
            }

            _context.PmIssues.Remove(pmIssues);
            await _context.SaveChangesAsync();

            return pmIssues;
        }

        private bool PmIssuesExists(int id)
        {
            return _context.PmIssues.Any(e => e.PmIssueId == id);
        }
    }
}
