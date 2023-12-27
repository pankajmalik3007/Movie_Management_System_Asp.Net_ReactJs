using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.DirectorServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorService _directorService;

        public DirectorController(IDirectorService directorService)
        {
            _directorService = directorService;
        }

        [Route("GetAlldirector")]
        [HttpGet]
        public async Task<ActionResult<directorviewmodel>> GetAllDirector()
        {
            var result = await _directorService.GetAll();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("GetDirectorByItsID")]
        [HttpGet]
        public async Task<ActionResult<directorviewmodel>> GetDirectorByItsID(int id)
        {
            var result = await _directorService.Get(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("Insertdirector")]
        [HttpPost]
        public async Task<IActionResult> Insertdirector(directorinsertmodel directorinsertmodel)
        {
            var res = await _directorService.Insert(directorinsertmodel);
            if(res == true)
            {
                return Ok("Directed Insert Successfully");

            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
           
        }

        [Route("Updatedirector")]
        [HttpPut]
        public async Task<IActionResult> Updatedirector(directorupdatemodel directorupdatemodel)
        {
            var res = await _directorService.Update(directorupdatemodel);
            if (res == true)
            {
                return Ok("Director update successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
           
        }

        [Route("Deletedirector")]
        [HttpDelete]
        public async Task<IActionResult> Deletedirector(int id)
        {
            var res = await _directorService.Delete(id);
            if (res == true)
            {
                return Ok("Directed Deleted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }

        }
    }
}
