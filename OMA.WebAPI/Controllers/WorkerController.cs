using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OMA.Model;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkerController : ControllerBase
    {
        private readonly ILogger<WorkerController> _logger;
        private readonly IWorkerService _service;
        public WorkerController(ILogger<WorkerController> logger, IWorkerService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IList<Worker> GetAll([FromQuery]WorkerSearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("{id}")]
        public Model.Worker GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpPost]
        public Worker Insert(WorkerInsertUpdateRequest request)
        {
            return _service.Insert(request);
        }

        [HttpPut("{id}")]
        public Worker Update(int id, WorkerInsertUpdateRequest request)
        {
            return _service.Update(id, request);
        }

        [HttpDelete ("{id}")]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
    }
}
