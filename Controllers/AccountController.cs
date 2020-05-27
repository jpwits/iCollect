﻿using iCollect.Entities;
using Microsoft.AspNetCore.Authorization;
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
        private readonly icollectdbContext _context;

        public AccountController(UserManager<IdentityUser> userManager,SignInManager<IdentityUser> signInManager, icollectdbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet, Route("getUser")]
        public async Task<IActionResult> getUser()
        {
            return new JsonResult(new { User.Identity.Name });
        }

        [AllowAnonymous]
        [HttpGet, Route("login/{username}/{password}")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));

            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:2070",
                audience: "http://localhost:2070",
                claims: new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                    //new Claim(ClaimTypes.Role, user.Role)
                },
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            var user = new IdentityUser()
            {
                UserName = username,
                Email = username
            };
            await _signInManager.SignInAsync(user, true);

            return Ok(new { Token = tokenString });
        }

        [AllowAnonymous]
        [HttpGet, Route("logout")]
        public async Task<IActionResult> logout()
        {
            _signInManager.SignOutAsync();
            return new JsonResult(true);
        }

        [AllowAnonymous]
        [HttpGet, Route("register/{username}/{email}/{password}")]
        public async Task<IActionResult> register(string username, string email, string password)
        {
            var userIdentity = new IdentityUser()
            {
                UserName = username,
                Email = email
            };
            var result = await _userManager.CreateAsync(userIdentity, password);

            return new JsonResult(new { result });
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
