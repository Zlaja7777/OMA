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
    public class OfferServicesService : IOfferServicesService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public OfferServicesService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.OfferServices> GetAll()
        {
            throw new NotImplementedException();
        }

        public Model.OfferServices GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
