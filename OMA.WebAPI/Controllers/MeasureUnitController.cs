using Microsoft.AspNetCore.Mvc;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeasureUnitController : ControllerBase
    {
        private readonly IMeasureUnitService _service;
        public MeasureUnitController(IMeasureUnitService service)
        {
            _service = service;
        }

        [HttpGet]
        public IList<Model.MeasureUnit> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.MeasureUnit GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
