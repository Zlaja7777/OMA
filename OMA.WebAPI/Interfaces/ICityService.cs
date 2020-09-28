using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface ICityService
    {
        IList<Model.City> GetAll(CitySearchRequest request);
        Model.City GetById(int id);
    }
}
