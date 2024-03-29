﻿using iCollect.Entities;
using iCollect.Enums;
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
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly icollectdbContext _context;

        public AccountController(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager,
            icollectdbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
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
            var user = new IdentityUser()
            {
                UserName = username,
                Email = username
            };
            await _signInManager.SignInAsync(user, true);

            //return Ok(new { Token = tokenString });
            return Ok(user);

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

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(RoleNames.User))
                {
                    await _roleManager.CreateAsync(new IdentityRole(RoleNames.User));
                }

                await _userManager.AddToRoleAsync(userIdentity, RoleNames.User);
            }
            else
            {
                //do something...haha!
            }

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
