using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCollect.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var albums = _context.Albums.Where(a => a.UserId == User.Identity.Name && a.IsActive==true).ToList();
            //var albums = from userItems in _context.UserItems
            //             join album in _context.Albums on userItems.AlbumId equals album.AlbumId
            //             where userItems.UserId == User.Identity.Name
            //             select album;

            return Json(new
            {
                albums,
            });
        }

        [HttpGet, Route("GetAlbum/{id}")]
        public async Task<IActionResult> GetAlbum(int id)
        {
            var album = _context.Albums.FirstOrDefault(m => m.AlbumId == id);
            return new JsonResult(album);
        }

        [HttpPut("updateAlbum")]
        //[ValidateAntiForgeryToken]
        public async Task<Albums> updateAlbum([FromBody] Albums data)
        {
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return data;
        }
    }
}