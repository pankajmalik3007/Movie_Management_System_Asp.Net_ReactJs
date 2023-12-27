using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Context;
using Infrastructure_Library.Services.Custom_Services.ActorServices;
using Infrastructure_Library.Services.Custom_Services.Movie_CastServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Runtime.CompilerServices;
using static Infrastructure_Library.Services.Custom_Services.Movie_CastServices.Movi_CastService;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Movie_CastController : ControllerBase
    {
        private readonly IMovi_CastService _movi_CastService;
        public Movie_CastController(IMovi_CastService movi_CastService)
        {
            _movi_CastService = movi_CastService;
        }
        [Route("GetAllMovieCast")]
        [HttpGet]
        public async Task<ActionResult<movie_castviewmodel>> GetAllMovieCast()
        {
            var res = await _movi_CastService.GetAll();
            if(res == null)
            {
                return BadRequest("Something Went Wrong");
            }
            return Ok(res);
        }

        [Route("InsertMovie_Cast")]
        [HttpPost]
        public async Task<IActionResult> InsertMovie_Cast(EventInputModel eventInputModel)
        {
            var res = await _movi_CastService.Insert(eventInputModel);
             if (res == true)
            {
                return Ok("Movie_Cast Inserted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }
        [Route("Update_Move_Cast")]
        [HttpPut]
        public async Task<IActionResult> Update_Move_Cast(EventInputModel1 movie_Castupdatemodel)
        {
            var res = await _movi_CastService.Update(movie_Castupdatemodel);
            if(res == true)
            {
                return Ok("movie_cast updated successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [Route("DeleteMovieCast")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMovieCast(int id)
        {
            var res = await _movi_CastService.Delete(id);
            if(res == true)
            {
                return Ok("Movie Cast Delete Successfully ");
            }
            else
            {
                return BadRequest("Not Deleted");
            }
        }
       
        }
    }

