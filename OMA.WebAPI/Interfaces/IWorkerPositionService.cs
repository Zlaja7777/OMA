using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IWorkerPositionService
    {
        IList<Model.WorkerPosition> GetAll();
        Model.WorkerPosition GetById(int id);
    }
}
