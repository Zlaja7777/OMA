using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IPositionService
    {
        IList<Model.Position> GetAll();
        Model.Position GetById(int id);
    }
}
