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
    public class OfferServicesController : ControllerBase
    {
        private readonly ILogger<OfferServicesController> _logger;
        private readonly IOfferServicesService _service;
        public OfferServicesController(ILogger<OfferServicesController> logger, IOfferServicesService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.OfferServices> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.OfferServices GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
