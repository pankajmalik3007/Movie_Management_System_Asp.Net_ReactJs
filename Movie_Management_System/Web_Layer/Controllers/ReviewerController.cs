using Domain_Library.ViewModels;
using Infrastructure_Library.Services.Custom_Services.RatingServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewerController : ControllerBase
    {
        private readonly IReviewerService _reviewerService;
        public ReviewerController(IReviewerService reviewerService)
        {
            _reviewerService = reviewerService;
        }

        [Route("GetAllReviewer")]
        [HttpGet]
        public async Task<ActionResult<reviewerviewmodel>> GetAllReviewer()
        {
            var res = await _reviewerService.GetAll();
            if(res == null)
            {
                return BadRequest("Reviewer Not Found");

            }
            return Ok(res);
        }

        [Route("GetReviewer")]
        [HttpGet]
        public async Task<ActionResult<reviewerviewmodel>> GetReviewer(int id)
        {
            var res = await _reviewerService.Get(id);
            if (res == null)
            {
                return BadRequest("Reviewer Not Found");
            }
            return Ok(res);
        }

        [Route("InsertReviewer")]
        [HttpPost]
        public async Task<IActionResult> InsertReviewer(reviewinsertmodel model)
        {
            var res = await _reviewerService.Insert(model);
            if (res == true)
            {
                return Ok("Reviewer Insert Successfully");
            }
            else
            {
                return BadRequest("Reviewer Not Inserted ");
            }
        }

        [Route("UpdateReviewer")]
        [HttpPut]
        public async Task<IActionResult> UpdateReviewer(reviewupdatemodel reviewupdatemodel)
        {
            var res = await _reviewerService.Update(reviewupdatemodel);
            if(res == true)
            {
                return Ok("Reviewer Updated Successfully");

            }
            else
            {
                return BadRequest("Something went Wrong......!");
            }
        }

        [Route("DeleteReviewer")]
        [HttpDelete]
        public async Task<IActionResult> DeleteReviewer(int id)
        {
            var res = await _reviewerService.Delete(id);
            if (res == true)
            {
                return Ok("Reviewer Deleted Successfully");
            }
            else
            {
                return BadRequest("Something Went Wrong");            }
        }

    }
}
