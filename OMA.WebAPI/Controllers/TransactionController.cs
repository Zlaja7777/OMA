using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OMA.Model.Requests;
using OMA.WebAPI.Interfaces;


namespace OMA.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly ITransactionService _service;
        public TransactionController(ITransactionService service, ILogger<TransactionController> logger)
        {
            _service = service;
            _logger = logger;
        }



        [HttpGet("{id}")]
        public Model.Transaction GetById(int id)
        {
            return _service.GetById(id);
        }


        [HttpGet("{id}/GetProgressBarValue")]
        public Model.TransactionProgressBar GetProgressBarValue(int id)
        {
            return _service.GetProgressBarValue(id);
        }

        [HttpGet]
        public IList<Model.Transaction> GetAll([FromQuery] TransactionSearchRequest request)
        {
            return _service.GetAll(request);
        }

        [HttpPost]
        public Model.Transaction Insert (TransactionInsertUpdateRequest t)
        {

            return _service.Insert(t);
        }
        [HttpPut("{id}")]
        public Model.Transaction Update(int id, TransactionInsertUpdateRequest request)
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
