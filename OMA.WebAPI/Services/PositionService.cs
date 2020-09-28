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
    public class PositionService : IPositionService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public PositionService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Position> GetAll()
        {
            throw new NotImplementedException();
        }

        public Model.Position GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
