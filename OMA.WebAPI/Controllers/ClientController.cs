using Microsoft.AspNetCore.Mvc;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _service;
        public ClientController(IClientService service)
        {
            _service = service;
        }

        [HttpGet]
        public IList<Model.Client> GetAll([FromQuery]ClientSearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpGet("{id}")]
        public Model.Client GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpPost]
        public Model.Client Insert(ClientInsertUpdateRequest request)
        {
            return _service.Insert(request);
        }
        [HttpPut("{id}")]
        public Model.Client Update(int id, ClientInsertUpdateRequest request)
        {
            return _service.Update(id, request);
        }

        [HttpPatch("{id}/changestatus")]
        public Model.Client ChangeStatus(int id, ChangeStatusRequest request)
        {
            return _service.ChangeStatus(id, request);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _service.Delete(id);
        }
        [HttpGet("/api/Client/{id}/{uId}/CounterOfProjects")]
        public Model.ClientCounterOfProjects CounterOfProjects (int id, string uId)
        {
            return _service.CounterOfProjects(id, uId);
        }

}
}
