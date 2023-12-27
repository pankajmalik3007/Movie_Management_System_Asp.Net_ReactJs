using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.ActorServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly IActorService _actorService;
        public ActorController(IActorService actorService)
        {
            _actorService = actorService;
        }

        [Route ("GetAllActor")]
        [HttpGet]

        public async Task<ActionResult<actorviewmodel>> GetAllActor()
        {
            {
                var result = await _actorService.GetAll();

                if (result == null)
                    return BadRequest("No Records Found, Please Try Again After Adding them...!");

                return Ok(result);
            }
        }

        [Route("GetActorById")]
        [HttpGet]
        public async Task<ActionResult<actorviewmodel>> GetActorById(int Id)
        {
            if (Id != null)
            {
                var result = await _actorService.Get(Id);

                if (result == null)
                    return BadRequest("No Records Found, Please Try Again After Adding them...!");

                return Ok(result);
            }
            else
                return NotFound("Invalid UserType ID, Please Entering a Valid One...!");
        }

        [Route ("InsertActor")]
        [HttpPost]
        public async Task<IActionResult> InsertActor(actorinsertmodel actorinsertmodel)
        {
            if (ModelState.IsValid)
            {
                var result = await _actorService.Insert(actorinsertmodel);
                if (result == true)
                    return Ok("Actor Inserted Successfully...!");
                else
                    return BadRequest("Something Went Wrong, Actor Is Not Inserted, Please Try After Sometime...!");
            }
            else
                return BadRequest("Invalid Actor Information, Please Provide Correct Details for UserType...!");
        }

        [Route("UpdateActor")]
        [HttpPut]

        public async Task<IActionResult> UpdateActor(actorupdatemodel actorupdatemodel)
        {
            var result = await _actorService.Update(actorupdatemodel);
            if(result == true)
            {
                return Ok("Actor Update Successfully");
            }
            else
            {
                return BadRequest("Actor not updated successfully");
            }
        }

        [Route("DeleteActor")]
        [HttpDelete]
        public async Task<IActionResult> DeleteActor(int Id)
        {
            var result = await _actorService.Delete(Id);
            if( result == true)
            {
                return Ok("Actor Deleted Successfully");
            }
            else
            {
                return BadRequest("Actor Not Deleted Successfully");
            }
        }
    }
}
