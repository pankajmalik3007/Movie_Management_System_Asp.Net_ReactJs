using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.Movie_GenresServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Movie_GenresController : ControllerBase
    {
        private readonly IMovie_Generes _Generes;
        public Movie_GenresController(IMovie_Generes generes)
        {
            _Generes = generes;
        }

        [Route("GetAllMovie_Genres")]
        [HttpGet]
        public async Task<ActionResult<movie_genresviewmodel>> GetAllMovie_Genres()
        {
            var res = await _Generes.GetAll();
            if (res == null)
            {
                return BadRequest("Data is not present");
            }
            return Ok(res);
        }

        [Route("GetMovie_Genres")]
        [HttpGet]
        public async Task<ActionResult<movie_genresviewmodel>> GetMovie_Genres(int id)
        {
            var res = await _Generes.Get(id);
            if (res == null)
            {
                return BadRequest("Not Found");
            }
            return res;
        }




        [Route("InsertMoviegenres")]
        [HttpPost]
        public async Task<IActionResult> InsertMoviegenres(movie_genresinsertmodel movie)
        {
            var res = await _Generes.Insert(movie);
            if (res == true)
            {
                return Ok("Movie Genres Inserted Successfully");
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("UpdateMoviegenres")]
        [HttpPut]
        public async Task<IActionResult> UpdateMoviegenres(movie_genresupdatemodel movie)
        {
            var res = await _Generes.Update(movie);
            if (res == true)
            {
                return Ok("Movie Genres Updated Successfully");
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("DeleteMovieGenres")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMovieGenres (int id)
        {
            var res = await _Generes.Delete(id);
            if(res == true)
            {
                return Ok("Moviegenres Deleted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong Plese try after some time");
            }
        }
    }

}