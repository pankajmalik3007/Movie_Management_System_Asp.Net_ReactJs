
using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Context;
using Infrastructure_Library.Repositories;
using Infrastructure_Library.Services.Custom_Services.RatingServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        
       private readonly IRatingService _repository;
        public RatingController(IRatingService repository)
        {
            _repository = repository;
        }

        [Route("GetAllRating")]
        [HttpGet]

        public async Task<ActionResult<ratingviewmodel>> GetAllRating()
        {
            var res = await _repository.GetAll();
            if(res == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(res);
            }
        }

        [Route("InsertRating")]
        [HttpPost]

        public async Task<IActionResult> InsertRating(RatingInputModel ratingInputModel)
        {
            var res = await _repository.InsertRating(ratingInputModel);
            if (res == true)
            {
                return Ok("Data Inserted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }
    }
}
