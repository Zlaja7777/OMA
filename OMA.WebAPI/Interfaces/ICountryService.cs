using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface ICountryService
    {
        IList<Model.Country> GetAll(CountrySearchRequest request);
        Model.Country GetById(int id);
        Model.Country Insert(CountryInsertUpdateRequest request);
        Model.Country Update(int id, CountryInsertUpdateRequest request);
        void Delete(int id);
    }
}
