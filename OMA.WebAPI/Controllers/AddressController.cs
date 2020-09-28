using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;
using OMA.WebAPI.Services;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly ILogger<AddressController> _logger;
        private readonly IAddressService _service;
        public AddressController(ILogger<AddressController> logger, IAddressService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.Address> GetAll([FromQuery]AddressSearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("{id}")]
        public Model.Address GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpPost]
        public Model.Address Insert(AddressInsertUpdateRequest request)
        {
            return _service.Insert(request);
        }

        [HttpPut("{id}")]
        public Model.Address Update(int id, AddressInsertUpdateRequest request)
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
