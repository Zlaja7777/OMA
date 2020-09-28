using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
 
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _service;
        public OfferController(IOfferService service)
        {
            _service = service;
        }

        [HttpGet]
        public IList<Model.Offer> GetAll([FromQuery]OfferSearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("/api/GetDashboardOffers")]
        public Model.DashboardOffer GetDashboardOffers([FromQuery]OfferSearchRequest request)
        {
            return _service.GetDashboardOffers(request);
        }

        [HttpGet("/api/GetOfferCounter")]
        public Model.OfferCounter GetOfferCounter([FromQuery]OfferSearchRequest request)
        {
            return _service.GetOfferCounter(request);
        }

        [HttpGet("{id}")]
        public Model.Offer GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpGet("/api/GetByUserId/{UId}")]
        public List<Model.OfferData>GetByUserId(string UId)
        {
          
            return _service.GetByUserId(UId);
        }
        
        [HttpPost]
        public Model.Offer Insert(OfferInsertUpdateRequest request)
        {
            return _service.Insert(request);
        }

        [HttpPut("{id}")]
        public Model.Offer Update(int id, OfferInsertUpdateRequest request)
        {
            return _service.Update(id, request);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
    }
}
