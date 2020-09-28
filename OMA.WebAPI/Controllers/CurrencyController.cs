using Microsoft.AspNetCore.Mvc;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;

namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService _service;
        public CurrencyController(ICurrencyService service)
        {
            _service = service;
        }

        [HttpGet]
        public IList<Model.Currency> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("{id}")]
        public Model.Currency GetById(int id)
        {
            return _service.GetById(id);
        }
    }
}
