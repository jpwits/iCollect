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
    [Route("api/Collections"), Produces("application/json"), EnableCors("AppPolicy")]
    public class CollectionsController : Controller
    {
        //private readonly UserManager<IdentityUser> _userManager;
        //private readonly SignInManager<IdentityUser> _signInManager;
        //private readonly RoleManager<IdentityRole> _roleManager;

        private readonly icollectdbContext _context;

        public CollectionsController(icollectdbContext context)
        {
            //_signInManager = signInManager;
            //_userManager = userManager;
            //_roleManager = roleManager;
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet, Route("getCatalogCollections")]
        public async Task<IActionResult> getCatalogCollections()
        {
            System.Security.Claims.ClaimsPrincipal currentUser = this.User;
            var username = User.Identities.First().Name;//.Claims.First().Value;
            bool IsAdmin = currentUser.IsInRole("Admin");
            var catalogCollections = _context.CatalogCollections.Where(b => b.Collection.UserId == username &&
                  b.Collection.IsActive == true).Include(a => a.Collection).Include(a=>a.Catalog).ThenInclude(b=>b.CatalogType);

            //var catalogCollections = from CatalogCollections in _context.CatalogCollections
            //                          join collection in _context.Collections on CatalogCollections.CollectionId equals collection.CollectionId
            //                          where collection.UserId == User.Identity.Name && collection.IsActive == true
            //                          select CatalogCollections;
            var _debug = catalogCollections.ToList();
            //return Ok(_debug);
            return Json(new
            {
                catalogCollections
            });
        }

        // [Authorize(Roles = "Admin")]
        [HttpGet, Route("getCatalogCollection/{collectionId}")]
        public ActionResult getCatalogCollection(int collectionId)
        {
            var catalogCollection = _context.CatalogCollections.Where(b => b.CollectionId == collectionId &&
                                b.Collection.UserId == User.Identity.Name && b.Collection.IsActive == true);

            //var catalogCollection = from userItems in _context.UserItems
            //             join collection in _context.Collection on userItems.CollectionId equals collection.CollectionId
            //             where userItems.UserId == User.Identity.Name
            //             select collection;
            return Ok(catalogCollection);
            //return Json(new
            //{
            //    catalogCollection,
            //});
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("updateCatalogCollection")]
        //[ValidateAntiForgeryToken]
        public async Task<CatalogCollections> updateCatalogCollection([FromBody] CatalogCollections data)
        {
            //warning check data collectionid not null, do not check for the impossible ever, we want the error :)
            if (!_context.CatalogCollections.Any(m => m.CollectionId == data.CollectionId))
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