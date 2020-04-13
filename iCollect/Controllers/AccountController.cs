using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
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
    [Route("api/Account"), Produces("application/json"), EnableCors("AppPolicy")]
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AccountController(UserManager<IdentityUser> userManager,SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpGet, Route("getUser/{username}")]
        public async Task<IActionResult> getUser(string username)
        {
            return new JsonResult(new { Name = User.Identity.Name });
        }

        [HttpGet, Route("login/{username}/{password}")]
        public async Task<IActionResult> Login(string username, string password)
        {
            //if (user == null)
            //{
            //    return BadRequest("Invalid client request");
            //}

            //if (user.UserName == "johndoe" && user.Password == "def@123")
            //{
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            var user = new IdentityUser()
            {
                UserName = username,
                Email = username
            };
            await _signInManager.SignInAsync(user, true);

            //var result = await _userManager.CreateAsync(user, password);
            //if (result.Succeeded)
            //{
            //    _signInManager.SignInAsync(user, true);
            //}

            return Ok(new { Token = tokenString });
            //}
            //else
            //{
            //    return Unauthorized();
            //}
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody]LoginModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var userIdentity = _mapper.Map<AppUser>(model);
        //    var result = await _userManager.CreateAsync(userIdentity, model.Password);

        //    if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        //    await _appDbContext.JobSeekers.AddAsync(new JobSeeker { IdentityId = userIdentity.Id, Location = model.Location });
        //    await _appDbContext.SaveChangesAsync();

        //    return new OkResult();
        //}
    }
}
