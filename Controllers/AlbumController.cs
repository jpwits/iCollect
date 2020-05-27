using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCollect.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iCollect.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/albums"), Produces("application/json"), EnableCors("AppPolicy")]
    public class AlbumController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly icollectdbContext _context;

        public AlbumController(SignInManager<IdentityUser> signInManager, icollectdbContext context)
        {
            _signInManager = signInManager;
            _context = context;
        }

      
        [HttpGet, Route("GetAlbumCollections")]
        public ActionResult GetAlbumCollections()
        {
            var username = User.Identities.First().Claims.First().Value;
            var albumsCollections = _context.AlbumCollections.Where(b => b.Album.UserId == username &&
                  b.Album.IsActive == true).Include(a => a.Album);

            //var albumsCollections = from albumCollections in _context.AlbumCollections
            //                        join album in _context.Albums on albumCollections.AlbumId equals album.AlbumId
            //                        where album.UserId == User.Identity.Name && album.IsActive == true
            //                        select albumCollections;
            var _debug = albumsCollections.ToList();
            //return Ok(_debug);
            return Json(new
            {
                albumsCollections
            });
        }

        [HttpGet, Route("GetAlbumCollections/{albumId}")]
        public ActionResult GetAlbumCollections(int albumId)
        {
            var albumsCollections = _context.AlbumCollections.Where(b => b.AlbumId == albumId && 
                                b.Album.UserId == User.Identity.Name && b.Album.IsActive == true);

            //var albums = from userItems in _context.UserItems
            //             join album in _context.Albums on userItems.AlbumId equals album.AlbumId
            //             where userItems.UserId == User.Identity.Name
            //             select album;
            return Ok(albumsCollections);
            //return Json(new
            //{
            //    albumsCollections,
            //});
        }

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