using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Repositories;
using Infrastructure_Library.Services.Custom_Services.RatingServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Infrastructure_Library.Services.Custom_Services.ReviewerServices
{
    public class ReviewerServices : IReviewerService
    {
        private readonly IRepository<reviewer> _repository;
        public ReviewerServices(IRepository<reviewer> repository)
        {
            _repository = repository;
        }

        public async Task<bool> Delete(int id)
        {
            reviewer reviewer = await _repository.Get(id);
            if (reviewer != null)
            {
                return await _repository.Delete(reviewer);
            }
            else
            {
                return false;
            }
        }

        public Task<reviewer> Find(Expression<Func<reviewer, bool>> predicate)
        {
            return _repository.Find(predicate);
        }

        public async Task<reviewerviewmodel> Get(int id)
        {
           var res = await _repository.Get(id);
            if (res == null)
            {
                return null;
            }
            else
            {

                reviewerviewmodel reviewerviewmodel = new()
                {
                    Id = res.Id,
                    rev_name = res.rev_name,
                    rev_dob = res.rev_dob,
                    rev_address = res.rev_address,
                    rev_country = res.rev_country,
                    rev_state = res.rev_state,
                    rev_city = res.rev_city,
                    rev_pincode = res.rev_pincode,
                    rev_phone_no = res.rev_phone_no,
                };
                return reviewerviewmodel;
            }
        }
      
        public async Task<ICollection<reviewerviewmodel>> GetAll()
        {
            ICollection<reviewerviewmodel> res1 = new List<reviewerviewmodel>();
            ICollection<reviewer> reviewers = await _repository.GetAll();
            foreach(reviewer res in reviewers)
            {
                reviewerviewmodel resviewermodel = new()
                {
                    Id=res.Id,
                    rev_name = res.rev_name,
                    rev_dob = res.rev_dob,
                    rev_address = res.rev_address,
                    rev_country = res.rev_country,
                    rev_state = res.rev_state,
                    rev_city = res.rev_city,
                    rev_pincode = res.rev_pincode,
                    rev_phone_no = res.rev_phone_no,
                };
                res1.Add(resviewermodel);
            }
            return res1;
        }

        public async Task<bool> Insert(reviewinsertmodel model)
        {
            reviewer res = new()
            {
                rev_name = model.rev_name,
                rev_dob = model.rev_dob,
                rev_address = model.rev_address,
                rev_country = model.rev_country,
                rev_state = model.rev_state,
                rev_city = model.rev_city,
                rev_pincode = model.rev_pincode,
                rev_phone_no = model.rev_phone_no,
                
             };
            return await _repository.Insert(res);
        }

        public async Task<bool> Update(reviewupdatemodel model)
        {
            reviewer res = await _repository.Get(model.Id);
            if(res!= null)
            {
                res.rev_name = model.rev_name;
                res.rev_dob = model.rev_dob;
                res.rev_address = model.rev_address;
                res.rev_country = model.rev_country;
                res.rev_state = model.rev_state;
                res.rev_city = model.rev_city;
                res.rev_pincode = model.rev_pincode;
                res.rev_phone_no = model.rev_phone_no;
                var up = await _repository.Update(res);
                return up;
            }
            return false;

        }
    }
}
