using Microsoft.AspNetCore.Mvc;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _service;
        public CountryController(ICountryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IList<Model.Country> GetAll([FromQuery]CountrySearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("{id}")]
        public Model.Country GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpPost]
        public Model.Country Insert(CountryInsertUpdateRequest request)
        {
            return _service.Insert(request);
        }

        [HttpPut("{id}")]
        public Model.Country Update(int id, CountryInsertUpdateRequest request)
        {
            return _service.Update(id, request);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
    }
}
