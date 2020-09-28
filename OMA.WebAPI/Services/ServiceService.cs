using AutoMapper;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Services
{
    public class ServiceService : IServiceService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public ServiceService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Service> GetAll()
        {
            throw new NotImplementedException();
        }

        public Model.Service GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
