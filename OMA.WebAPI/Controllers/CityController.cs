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
    public class CityController : ControllerBase
    {
        private readonly ILogger<CityController> _logger;
        private readonly ICityService _service;
        public CityController(ILogger<CityController> logger, ICityService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.City> GetAll([FromQuery]CitySearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("{id}")]
        public Model.City GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
