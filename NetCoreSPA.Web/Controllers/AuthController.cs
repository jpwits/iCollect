using iCollect.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace iCollect.Controllers
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]

    public class AuthController : Controller
    {
        
    }
}
