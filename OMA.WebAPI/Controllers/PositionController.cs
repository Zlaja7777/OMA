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
    public class PositionController : ControllerBase
    {
        private readonly ILogger<PositionController> _logger;
        private readonly IPositionService _service;
        public PositionController(ILogger<PositionController> logger, IPositionService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.Position> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.Position GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
