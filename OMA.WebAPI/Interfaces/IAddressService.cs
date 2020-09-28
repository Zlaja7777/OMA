using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IAddressService
    {
        IList<Model.Address> GetAll(AddressSearchRequest request);
        Model.Address GetById(int id);
        Model.Address Insert(AddressInsertUpdateRequest request);
        Model.Address Update(int id, AddressInsertUpdateRequest request);
        void Delete(int id);
    }
}
