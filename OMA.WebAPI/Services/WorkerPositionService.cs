using AutoMapper;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Services
{
    public class WorkerPositionService : IWorkerPositionService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public WorkerPositionService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.WorkerPosition> GetAll()
        {
            throw new NotImplementedException();
        }

        public Model.WorkerPosition GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
