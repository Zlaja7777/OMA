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
    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;
        private readonly IServiceService _service;
        public ServiceController(ILogger<ServiceController> logger, IServiceService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.Service> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.Service GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
