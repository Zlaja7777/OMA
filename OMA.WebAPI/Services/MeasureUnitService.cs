using AutoMapper;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class MeasureUnitService : IMeasureUnitService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public MeasureUnitService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.MeasureUnit> GetAll()
        {
            var list = _context.MeasureUnit.ToList();

            return _mapper.Map<List<Model.MeasureUnit>>(list);
        }

        public Model.MeasureUnit GetById(int id)
        {
            var entity = _context.MeasureUnit.Find(id);

            return _mapper.Map<Model.MeasureUnit>(entity);
        }
    }
}
