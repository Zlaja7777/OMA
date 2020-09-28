using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IStatusService
    {
        IList<Model.Status> GetAll();
        Model.Status GetById(int id);
    }
}
