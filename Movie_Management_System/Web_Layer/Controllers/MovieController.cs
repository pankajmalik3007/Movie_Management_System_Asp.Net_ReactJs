using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.MovieServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [Route("GetAllMovies")]
        [HttpGet]
        public async Task<ActionResult<movieviewmodel>> GetAllMovies()
        {
            var result = await _movieService.GetAll();
            if (result == null) 
            {
                return BadRequest("Movies Not Found");
            }
            return Ok(result);
        }

        [Route("GetMovie")]
        [HttpGet]
        public async Task<ActionResult<movieviewmodel>> GetMovie(int id)
        {
            var movies = await _movieService.GetById(id);
            if(movies == null)
            {
                return BadRequest("movies Not Found");
            }
            return Ok(movies);
        }

        [Route("Insertmovie")]
        [HttpPost]
        public async Task<IActionResult> InsertMovie(movieinsertmodel movieinsertmodel)
        {
            var movies = await _movieService.Insert(movieinsertmodel);
            if(movies == true)
            {
                return Ok("Movies Inserted Successfully");
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("UpdateMovie")]
        [HttpPut]
        public async Task<IActionResult> UpdateMovie(movieupdatemodel movieupdatemodel)
        {
            var movies = await _movieService.Update(movieupdatemodel);
            if (movies == true)
            {
                return Ok("Movies Updated Successfully");
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("DeleteMovie")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movies = await _movieService.Delete(id);
            if(movies == true)
            {
                return Ok("movie Deleted Successfully");
            }
            return BadRequest("Something Went Wrong Please try After Some Time");
        }
    }
}
