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
    public class WorkerPositionController : ControllerBase
    {
        private readonly ILogger<WorkerPositionController> _logger;
        private readonly IWorkerPositionService _service;
        public WorkerPositionController(ILogger<WorkerPositionController> logger, IWorkerPositionService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Model.WorkerPosition> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.WorkerPosition GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
