using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class ClientService : IClientService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public ClientService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Client> GetAll(ClientSearchRequest request)
        {
            var query = _context.Client.Where(x => x.Inactive == false).AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.AppUserId))
            {
                query = query.Where(x => x.AppUserId == request.AppUserId);
            } 

            if (!string.IsNullOrWhiteSpace(request?.FirstName))
            {
                query = query.Where(x => x.FirstName.StartsWith(request.FirstName));
            }

            if (!string.IsNullOrWhiteSpace(request?.LastName))
            {
                query = query.Where(x => x.LastName.StartsWith(request.LastName));
            }

            if (!string.IsNullOrWhiteSpace(request?.CompanyName))
            {
                query = query.Where(x => x.CompanyName.StartsWith(request.CompanyName));
            }

            var list = query.ToList();

            return _mapper.Map<IList<Model.Client>>(list);
        }

        public Model.Client GetById(int id)
        {
            var entity = _context.Client.Find(id);

            return _mapper.Map<Model.Client>(entity);
        }

        public Model.Client Insert(ClientInsertUpdateRequest request)
        {
            var entity = _mapper.Map<Client>(request);

            _context.Add(entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Client>(entity);
        }

        public Model.Client Update(int id, ClientInsertUpdateRequest request)
        {
            var entity = _context.Client.Find(id);

            _mapper.Map(request, entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Client>(entity);
        }

        public Model.Client ChangeStatus(int id, ChangeStatusRequest request)
        {
            var entity = _context.Client.Find(id);
            entity.Inactive = request.Inactive;
            _context.SaveChanges();

            return _mapper.Map<Model.Client>(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.Client.Find(id);

            _context.Client.Remove(entity);
            _context.SaveChanges();
        }
        public Model.ClientCounterOfProjects CounterOfProjects(int id, string uId)
        {
            var model = new Model.ClientCounterOfProjects();
           // const int waiting = 1;
           // const int acceptedProject = 2;
            const int inProgress = 3;
           // const int denied = 4;
            const int done = 5;

            var offer = _context.Offer.Where(w => w.ClientId == id && w.AppUserId == uId).ToList();

            model.numberOfProjects = offer.Count(c=> c.StatusId == inProgress || c.StatusId == done);
            model.activeProjects = offer.Count(c => c.StatusId == inProgress);
            model.finishedProjects = offer.Count(w=> w.StatusId == done);
            model.remainingToPay = offer.Count(c => !c.Paid && c.StatusId == inProgress);
            model.paidProjects = offer.Count(c => c.Paid && c.StatusId == done);
       

            return _mapper.Map<Model.ClientCounterOfProjects>(model);
        }
    }
}
