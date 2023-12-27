using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.GenresServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IGenresService _genresService;
        public GenresController(IGenresService genresService)
        {
            _genresService = genresService;
        }

        [Route("GetAllGenres")]
        [HttpGet]
        public async Task<ActionResult<genresviewmodel>> GetAllGenres()
        {
            var gen = await _genresService.GetAll();
            if(gen == null)
            {
                return BadRequest("Genres Not Found");
            }
            return Ok(gen);
        }

        [Route("GetGenres")]
        [HttpGet]
        public async Task<ActionResult<genresviewmodel>> GetGenres(int id)
        {
            var gen = await _genresService.Get(id);
            if(gen == null)
            {
                return BadRequest("genres Not Found");
            }
            return Ok(gen);
        }
        [Route("Insertgenres")]
        [HttpPost]
        public async Task<IActionResult> Insertgenres(genresinsertmodel genresinsertmodel)
        {
            var res = await _genresService.Insert(genresinsertmodel);
            if(res == true)
            {
                return Ok("Genres Added Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [Route("UpdateGenres")]
        [HttpPut]
        public async Task<IActionResult> Updategenres(genresupdatemodel genresupdatemodel)
        {
            var res = await _genresService.Update(genresupdatemodel);
            if (res == true)
            {
                return Ok("Genres Update Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [Route("DeleteGenres")]
        [HttpDelete]
        public async Task<IActionResult> DeleteGenres(int id)
        {
            var res = await _genresService.Delete(id);
            if (res == true)
            {
                return Ok("Genres Deleted successfully");
            }
            else
            {
                return BadRequest("Something Went Worong Please Try after Some Time");
            }
        }
    }
}
