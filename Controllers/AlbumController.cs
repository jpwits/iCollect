using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCollect.Entities;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet, Route("GetAlbumCollections")]
        public async Task<IActionResult> GetAlbumCollections()
        {
            var albumsCollections = _context.AlbumCollections.Where(b => b.Album.UserId == User.Identity.Name &&
                  b.Album.IsActive == true).Include(a => a.Album);

            //var albumsCollections = from albumCollections in _context.AlbumCollections
            //                        join album in _context.Albums on albumCollections.AlbumId equals album.AlbumId
            //                        where album.UserId == User.Identity.Name && album.IsActive == true
            //                        select albumCollections;
            var _debug = albumsCollections.ToList();
            return Json(new
            {
                albumsCollections,
            });
        }

        [Authorize]
        [HttpGet, Route("GetAlbumCollections/{albumId}")]
        public ActionResult GetAlbumCollections(int albumId)
        {
            var albumsCollections = _context.AlbumCollections.Where(b => b.AlbumId == albumId && 
                                b.Album.UserId == User.Identity.Name && b.Album.IsActive == true);

            //var albums = from userItems in _context.UserItems
            //             join album in _context.Albums on userItems.AlbumId equals album.AlbumId
            //             where userItems.UserId == User.Identity.Name
            //             select album;

            return Json(new
            {
                albumsCollections,
            });
        }

        [Authorize]
        [HttpPut("updateAlbumCollection")]
        //[ValidateAntiForgeryToken]
        public async Task<AlbumCollections> updateAlbumCollection([FromBody] AlbumCollections data)
        {
            //warning check data albumid not null, do not check for the impossible ever, we want the error :)
            if (!_context.AlbumCollections.Any(m => m.AlbumId == data.AlbumId))
            {
                data.CollectionId = 1;
            }
            else
            {
                data.CollectionId = 1;
            }
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return data;
        }
    }
}