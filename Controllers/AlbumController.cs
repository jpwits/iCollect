using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCollect.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace iCollect.Controllers
{
    [Route("api/albums"), Produces("application/json"), EnableCors("AppPolicy")]
    public class AlbumController : Controller
    {
        private readonly icollectdbContext _context;

        public AlbumController(icollectdbContext context)
        {
            _context = context;
        }

        [HttpGet, Route("GetAlbums")]
        public ActionResult GetAlbums()
        {
            var albums = _context.Albums.ToList();
            return Json(new
            {
                albums,
            });
        }

        [HttpGet, Route("GetAlbum/{id}")]
        public async Task<IActionResult> GetAlbum(int id)
        {
            var album =  _context.Albums.FirstOrDefault(m => m.AlbumId == id);
            return new JsonResult(album);
        }

        [HttpPost("updateAlbum")]
        //[ValidateAntiForgeryToken]
        public async Task<Albums> updateAlbum([FromBody] Albums data)
        {
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return data;
        }
    }
}