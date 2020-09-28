using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface IOfferService
    {
        IList<Model.Offer> GetAll(OfferSearchRequest request);
        Model.DashboardOffer GetDashboardOffers(OfferSearchRequest request);
        Model.OfferCounter GetOfferCounter(OfferSearchRequest request);
        Model.Offer GetById(int id);
        Model.Offer Insert(OfferInsertUpdateRequest request);
        Model.Offer Update(int id, OfferInsertUpdateRequest request);
        List<Model.OfferData> GetByUserId(string id);
        void Delete(int id);
    }
}
