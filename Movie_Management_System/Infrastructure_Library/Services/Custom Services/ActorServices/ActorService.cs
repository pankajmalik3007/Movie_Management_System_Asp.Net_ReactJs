using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.ActorServices
{
    public class ActorService : IActorService
    {
        private readonly IRepository<actor> _actor;

        public ActorService(IRepository<actor> actor)
        {
            _actor = actor;
        }
        public async Task<bool> Delete(int Id)
        {
           if(Id != null){
                actor actor = await _actor.Get(Id);
                if(actor != null)
                {

                    return await _actor.Delete(actor);
                }
                else
                {
                    return false;
                }

              }
            else
            {
                return false;
            }
        }

        public Task<actor> Find(Expression<Func<actor, bool>> match)
        {
            return _actor.Find(match);
        }

        public async Task<actorviewmodel> Get(int id)
        {
           var actor =  await _actor.Get(id);
            if(actor == null)
            {
                return null;
            }
            else
            {
                actorviewmodel actorviewmodel = new()
                {
                    Id = actor.Id,
                    act_firstname = actor.act_firstname,
                    act_lastname = actor.act_lastname,
                    act_gender = actor.act_gender,
                    act_dob = actor.act_dob,
                 };
                return actorviewmodel;
            }
        }

        public async Task<ICollection<actorviewmodel>> GetAll()
        {
            ICollection<actorviewmodel> actorviewmodels = new List<actorviewmodel>();
            ICollection<actor> actors =  await _actor.GetAll();
            foreach(actor actor in actors)
            {
                actorviewmodel actorviewmodel = new()
                {
                    Id=actor.Id,
                    act_firstname =actor.act_firstname,
                    act_lastname=actor.act_lastname,
                    act_gender =actor.act_gender,
                    act_dob=actor.act_dob,
                };
                actorviewmodels.Add(actorviewmodel);
            }
            return actorviewmodels;
        }

        public actor GetLast()
        {
            return _actor.GetLast();
        }

        public Task<bool> Insert(actorinsertmodel actorinsertmodel)
        {
            actor actor = new()
            {
                act_firstname = actorinsertmodel.act_firstname,
                act_lastname = actorinsertmodel.act_lastname,
                act_gender = actorinsertmodel.act_gender,
                act_dob = DateTime.Now,
            };
            return _actor.Insert(actor);
        }

        public async Task<bool> Update(actorupdatemodel actorupdatemodel)
        {
            actor actors = await _actor.Get(actorupdatemodel.Id);
            if (actors != null)
            {
                actors.act_firstname = actorupdatemodel.act_firstname;
                actors.act_lastname = actorupdatemodel.act_lastname;
                actors.act_gender = actorupdatemodel.act_gender;
                actors.act_dob = actorupdatemodel.act_dob;
                var result = await _actor.Update(actors);
                return result;
            }
            else
            {
                return false;
            }
        }
    }
}
