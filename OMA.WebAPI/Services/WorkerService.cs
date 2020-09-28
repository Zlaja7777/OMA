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
    public class WorkerService : IWorkerService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public WorkerService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IList<Model.Worker> GetAll(WorkerSearchRequest request)
        {
            var query = _context.Worker.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.AppUserId))
            {
                query = query.Where(x => x.AppUserId == request.AppUserId);
            }

            var list = query.ToList();

            return _mapper.Map<IList<Model.Worker>>(list);
        }
        public Model.Worker GetById(int id)
        {
            var entity = _context.Worker.Find(id);

            return _mapper.Map<Model.Worker>(entity);
        }

        public Model.Worker Insert(WorkerInsertUpdateRequest request)
        {
            var entity = _mapper.Map<Worker>(request);

            _context.Add(entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Worker>(entity);
        }

        public Model.Worker Update(int id, WorkerInsertUpdateRequest request)
        {
            var entity = _context.Worker.Find(id);

            _mapper.Map(request, entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Worker>(entity);
        }
        public void Delete(int id)
        {
            var entity = _context.Worker.Find(id);

            _context.Worker.Remove(entity);
            _context.SaveChanges();
        }
    }
}
