using AutoMapper;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public CurrencyService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Currency> GetAll()
        {
            var list = _context.Currency.ToList();

            return _mapper.Map<List<Model.Currency>>(list);
        }

        public Model.Currency GetById(int id)
        {
            var entity = _context.Currency.Find(id);

            return _mapper.Map<Model.Currency>(entity);
        }
    }
}
