using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IServiceService
    {
        IList<Model.Service> GetAll();
        Model.Service GetById(int id);
    }
}
