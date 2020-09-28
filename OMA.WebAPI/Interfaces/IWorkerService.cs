using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface IWorkerService
    {
        IList<Model.Worker> GetAll(WorkerSearchRequest request);
        Model.Worker GetById(int id);
        Model.Worker Insert(WorkerInsertUpdateRequest request);
        Model.Worker Update(int id, WorkerInsertUpdateRequest request);
        void Delete(int id);
    }
}
