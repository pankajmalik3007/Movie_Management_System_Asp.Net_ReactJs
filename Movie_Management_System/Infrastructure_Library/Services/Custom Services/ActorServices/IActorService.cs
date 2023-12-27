using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.ActorServices
{
    public  interface IActorService
    {
        Task<ICollection<actorviewmodel>> GetAll();
        Task<actorviewmodel> Get(int id);
        actor GetLast();
        Task<bool> Insert(actorinsertmodel actorinsertmodel);
        Task<bool> Update(actorupdatemodel actorupdatemodel);
        Task <bool> Delete (int id);
        Task<actor> Find(Expression<Func<actor, bool>> match);
    }
}
