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
    public class CityService : ICityService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public CityService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.City> GetAll(CitySearchRequest request)
        {
            var query = _context.City.AsQueryable();

            if (request?.CountryId.HasValue == true)
            {
                query = query.Where(x => x.CountryId == request.CountryId);
            }

            var list = query.ToList();

            return _mapper.Map<IList<Model.City>>(list);
        }

        public Model.City GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
