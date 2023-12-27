using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.MovieDirectionServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieDirectionController : ControllerBase
    {
        private readonly IMovieDirection _direction;
        public MovieDirectionController (IMovieDirection direction)
        {
            _direction = direction;
        }

        [Route("GetAllMovieDirection")]
        [HttpGet]
        public async Task<ActionResult<movie_directionviewmodel>> GetAllMovieDirection()
        {
            var res = await _direction.GetAll();
            if(res == null)
            {
                return BadRequest("MovieDirection Not Found");
            }
            else
            {
                return Ok(res);
            }
        }

        [Route("GetMovieDirection")]
        [HttpGet]

        public async Task<ActionResult<movie_directionviewmodel>> GetMovieDirection(int id)
        {
            var res = await _direction.Get(id);
            if(res == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(res);
        }

        [Route("InsertDirection")]
        [HttpPost]
        public async Task<IActionResult> InsertDirection(movie_directionInsertmodel model)
        {
            var res = await _direction.Insert(model);
            if(res == true)
            {
                return Ok("Movie DirectionInsert Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [Route("UpdateDirection")]
        [HttpPut]
        public async Task<IActionResult> UpdateDirection(movie_directionupdatemodel model)
        {
            var res = await _direction.Update(model);
            if (res == true)
            {
                return Ok("Movie UpdateDirection Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [Route("DeleteDirection")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDirection(int id)
        {
            var res = await _direction.Delete(id);
            if (res == true)
            {
                return Ok("Movie Direction Deleted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }
    }
}
