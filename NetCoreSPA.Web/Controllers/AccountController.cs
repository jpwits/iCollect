using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace iCollect.Controllers
{

    [Route("api/Account"), Produces("application/json"), EnableCors("AppPolicy")]
    public class AccountController : Controller
    {
        [HttpGet, Route("getUser/{username}")]
        public async Task<IActionResult> getUser(string username)
        {
            return new JsonResult(new { Name = User.Identity.Name });
        }
    }
}
