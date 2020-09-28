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
    public class ProjectTasksController : ControllerBase
    {
        private readonly ILogger<ProjectTasksController> _logger;
        private readonly IProjectTasksService _service;

        public ProjectTasksController(ILogger<ProjectTasksController> logger, IProjectTasksService service)
        {
            _logger = logger;
            _service = service;
        }


        [HttpGet]
        public IList<Model.ProjectTasksData> GetAll([FromQuery] ProjectTasksSearchRequest request)
        {
            return _service.GetAll(request);
        }


        [HttpGet("{id}")]
        public Model.ProjectTasks GetById(int id)
        {
            return _service.GetById(id);
        }
        [HttpPost]
        public Model.ProjectTasks Insert(ProjectTasksInsertUpdateRequest t)
        {

            return _service.Insert(t);
        }
        [HttpPut("{id}")]
        public Model.ProjectTasks Update(int id, ProjectTasksInsertUpdateRequest request)
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
