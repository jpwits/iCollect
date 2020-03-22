//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace iCollect.Controllers
//{
//    [Route("api/Account"), Produces("application/json"), EnableCors("AppPolicy")]
//    public class AccountControllerold : Controller
//    {
//        private readonly SignInManager<IdentityUser> _signInManager;

//        [HttpGet, Route("getUser/{username}")]
//        public async Task<IActionResult> getUser(string username)
//        {
//            return new JsonResult(new { Name = User.Identity.Name });
//        }

//        [HttpPost]
//        public async Task<IActionResult> Post([FromBody]LoginModel model)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            var userIdentity = _mapper.Map<AppUser>(model);
//            var result = await _userManager.CreateAsync(userIdentity, model.Password);

//            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

//            await _appDbContext.JobSeekers.AddAsync(new JobSeeker { IdentityId = userIdentity.Id, Location = model.Location });
//            await _appDbContext.SaveChangesAsync();

//            return new OkResult();
//        }
//    }
//}
