using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Domain_Library.Models;
using Infrastructure_Library.Context;
using System.Text.Json.Serialization;
using System.Text.Json;
using Domain_Library.ViewModels;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConditionController : ControllerBase
    {
        private readonly MainDbContext _context;

        public ConditionController(MainDbContext context)
        {
            _context = context;
        }

        [HttpGet("SearchActor")]
        public async Task<IActionResult> SearchActor(string keyword)
        {
            var actorInfo = await _context.actors
                .Where(a => a.act_firstname.Contains(keyword) )
                .Select(a => new actorviewmodel
                {
                    Id = a.Id,
                    act_firstname = a.act_firstname,
                    act_lastname = a.act_lastname,
                    act_gender = a.act_gender,
                    act_dob = a.act_dob,
                    MovieCasts = a.movie_cast.Select(mc => new movie_castviewmodel
                    {
                        Id = mc.Id,
                        act_id = mc.act_id,
                        mov_id = mc.mov_id,
                        
                        act_firstname = a.act_firstname, 
                       
                        role = mc.role
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (actorInfo == null)
            {
                return NotFound("Actor not found");
            }

            return Ok(actorInfo);
        }

        



        [HttpGet("SearchMovie")]
        public async Task<IActionResult> SearchMovie(string mov_title)
        {
            var movie = await _context.movie
                .Include(m => m.mov_genres)
                .Include(m => m.mov_directions)  
                .Include(m => m.mov_rating)
                .Include(m => m.mov_casts)
                .FirstOrDefaultAsync(m => m.mov_title == mov_title);

            if (movie == null)
            {
                return NotFound("Movie not found");
            }

            
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                MaxDepth = 32, 
            };

            
            var movieJson = JsonSerializer.Serialize(movie, jsonSerializerOptions);

            return Ok(movieJson);
        }



        [HttpGet("SearchDirector")]
        public async Task<IActionResult> SearchDirector(string dir_firstname)
        {
            var directorInfo = await _context.directors
                .Include(d => d.movie_directions)
                .Where(d => d.dir_firstname == dir_firstname)
                .ToListAsync();

            if (directorInfo == null)
            {
                return NotFound("Director not found");
            }

            return Ok(directorInfo);
        }

        [HttpGet("SearchGenre")]
        public async Task<IActionResult> SearchGenre(string gen_title)
        {
            var genreInfo = await _context.genres
                .Include(g => g.Movie_Genres)
                .Where(g => g.gen_title == gen_title)
                .ToListAsync();

            if (genreInfo == null)
            {
                return NotFound("Genre not found");
            }

            return Ok(genreInfo);
        }
    }
}
