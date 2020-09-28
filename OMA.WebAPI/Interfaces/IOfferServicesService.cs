using OMA.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Interfaces
{
    public interface IOfferServicesService
    {
        IList<Model.OfferServices> GetAll();
        Model.OfferServices GetById(int id);
    }
}
