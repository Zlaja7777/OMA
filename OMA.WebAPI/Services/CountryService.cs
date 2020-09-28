using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class CountryService : ICountryService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public CountryService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IList<Model.Country> GetAll(CountrySearchRequest request)
        {
            var query = _context.Country.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.Name))
            {
                query = query.Where(x => x.Name.StartsWith(request.Name));
            }

            //if (!string.IsNullOrWhiteSpace(request?.OtherProperty))
            //{
            //    query = query.Where(x => x.Name.StartsWith(request.OtherProperty));
            //}

            var list = query.ToList();

            return _mapper.Map<IList<Model.Country>>(list);
        }

        public Model.Country GetById(int id)
        {
            var entity = _context.Country.Find(id);

            return _mapper.Map<Model.Country>(entity);
        }

        public Model.Country Insert(CountryInsertUpdateRequest request)
        {
            var entity = _mapper.Map<Country>(request);

            _context.Add(entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Country>(entity);
        }

        public Model.Country Update(int id, CountryInsertUpdateRequest request)
        {
            var entity = _context.Country.Find(id);

            _mapper.Map(request, entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Country>(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.Country.Find(id);

            _context.Country.Remove(entity);
            _context.SaveChanges();
        }
    }
}
