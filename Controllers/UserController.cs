using iCollect.Entities;
using iCollect.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
    [Authorize]
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]

    public class UserController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;
        public UserController(IConfiguration config, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _config = config;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            try
            {
                //Sign user in with username and password from parameters. This code assumes that the emailaddress is being used as the username. 
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

                if (result.Succeeded)
                {
                    //var name = _signInManager.GetExternalLoginInfoAsync();
                    //Retrieve authenticated user's details
                    var user = await _userManager.FindByEmailAsync(model.Username);

                    //Generate unique token with user's details
                    var tokenString = await GenerateJSONWebToken(user);

                    //Return Ok with token string as content
                    return Ok(new { token = tokenString });
                }
                return Unauthorized();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        private async Task<string> GenerateJSONWebToken(IdentityUser user)
        {
            //Hash Security Key Object from the JWT Key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Generate list of claims with general and universally recommended claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            //Retreive roles for user and add them to the claims listing
            //var roles = await _userManager.GetRolesAsync(user);
            //claims.AddRange(roles.Select(r => new Claim(ClaimsIdentity.DefaultRoleClaimType, r)));
            //Generate final token adding Issuer and Subscriber data, claims, expriation time and Key
            var token = new JwtSecurityToken(_config["Jwt:Issuer"]
                , _config["Jwt:Issuer"],
                claims,
                null,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: credentials
            );

            //Return token string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //[Authorize(Roles = RoleEnum.Admin)]
        //[HttpGet]
        //public IActionResult GetAll()
        //{
        //    var users = _userService.GetAll();
        //    return Ok(users);
        //}

        //[HttpGet("{id}")]
        //public IActionResult GetById(int id)
        //{
        //    // only allow admins to access other user records
        //    var currentUserId = int.Parse(User.Identity.Name);
        //    if (id != currentUserId && !User.IsInRole(RoleEnum.Admin))
        //        return Forbid();

        //    var user = _userService.GetById(id);

        //    if (user == null)
        //        return NotFound();

        //    return Ok(user);
        //}
    }
}
