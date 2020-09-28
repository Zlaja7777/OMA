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
    public class StatusService : IStatusService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public StatusService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Status> GetAll()
        {
            var list = _context.Status.ToList();

            return _mapper.Map<IList<Model.Status>>(list);
        }

        public Model.Status GetById(int id)
        {
            var entity = _context.Status.Find(id);

            return _mapper.Map<Model.Status>(entity);
        }
    }
}
