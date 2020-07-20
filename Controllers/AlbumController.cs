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
        //private readonly UserManager<IdentityUser> _userManager;
        //private readonly SignInManager<IdentityUser> _signInManager;
        //private readonly RoleManager<IdentityRole> _roleManager;

        private readonly icollectdbContext _context;

        public AlbumController(icollectdbContext context)
        {
            //_signInManager = signInManager;
            //_userManager = userManager;
            //_roleManager = roleManager;
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet, Route("GetAlbumCatalogs")]
        public async Task<IActionResult> GetAlbumCatalogs()
        {
            System.Security.Claims.ClaimsPrincipal currentUser = this.User;
            var username = User.Identities.First().Name;//.Claims.First().Value;
            //bool IsAdmin = currentUser.IsInRole("Admin");
            var albumsCatalogs = _context.AlbumCatalogs.Where(b => b.Album.UserId == username &&
                  b.Album.IsActive == true).Include(a => a.Album);

            //var albumsCatalogs = from AlbumCatalogs in _context.AlbumCatalogs
            //                        join album in _context.Albums on AlbumCatalogs.AlbumId equals album.AlbumId
            //                        where album.UserId == User.Identity.Name && album.IsActive == true
            //                        select AlbumCatalogs;
            var _debug = albumsCatalogs.ToList();
            //return Ok(_debug);
            return Json(new
            {
                albumsCatalogs
            });
        }

       // [Authorize(Roles = "Admin")]
        [HttpGet, Route("GetAlbumCatalog/{albumId}")]
        public ActionResult GetAlbumCatalog(int albumId)
        {
            var albumsCatalogs = _context.AlbumCatalogs.Where(b => b.AlbumId == albumId && 
                                b.Album.UserId == User.Identity.Name && b.Album.IsActive == true);

            //var albumsCatalogs = from userItems in _context.UserItems
            //             join album in _context.Albums on userItems.AlbumId equals album.AlbumId
            //             where userItems.UserId == User.Identity.Name
            //             select album;
            return Ok(albumsCatalogs);
            //return Json(new
            //{
            //    albumsCatalogs,
            //});
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("updateAlbumCatalog")]
        //[ValidateAntiForgeryToken]
        public async Task<AlbumCatalogs> updateAlbumCatalog([FromBody] AlbumCatalogs data)
        {
            //warning check data albumid not null, do not check for the impossible ever, we want the error :)
            if (!_context.AlbumCatalogs.Any(m => m.AlbumId == data.AlbumId))
            {
                data.CatalogId = 1;
            }
            else
            {
                data.CatalogId = 1;
            }
            _context.Update(data);
            int rc = await _context.SaveChangesAsync();
            return data;
        }
    }
}