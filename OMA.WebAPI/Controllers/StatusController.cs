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
    public class StatusController : ControllerBase
    {
        private readonly ILogger<StatusController> _logger;
        private readonly IStatusService _service;
        public StatusController(ILogger<StatusController> logger, IStatusService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.Status> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.Status GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
