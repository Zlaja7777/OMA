using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface IClientService
    {
        IList<Model.Client> GetAll(ClientSearchRequest request);
        Model.Client GetById(int id);
        Model.Client Insert(ClientInsertUpdateRequest request);
        Model.Client Update(int id, ClientInsertUpdateRequest request);
        Model.Client ChangeStatus(int id, ChangeStatusRequest request);
        Model.ClientCounterOfProjects CounterOfProjects(int id, string uId);
        void Delete(int id);
    }
}
