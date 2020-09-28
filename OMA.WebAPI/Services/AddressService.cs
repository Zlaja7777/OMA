using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class AddressService : IAddressService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;


        public AddressService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IList<Model.Address> GetAll(AddressSearchRequest request)
        {
            var query = _context.Address.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.Name))
            {
                query = query.Where(x => x.Name == request.Name);
            }


            if (!string.IsNullOrWhiteSpace(request?.StreetNumber))
            {
                query = query.Where(x => x.StreetNumber == request.StreetNumber);
            }

            if (request?.CityId.HasValue == true)
            {
                query = query.Where(x => x.CityId == request.CityId);
            }

            var list = new List<Model.Address>();
            foreach (var item in query.Include(x => x.City).Include(x => x.City.Country).ToList())
            {
                list.Add(new Model.Address
                {
                    AddressId = item.AddressId,
                    City = item.City.Name,
                    CityId = item.CityId,
                    Country = item.City.Country.Name,
                    Name = item.Name,
                    StreetNumber = item.StreetNumber,
                    CountryId = item.City.CountryId
                });
            }

            return _mapper.Map<IList<Model.Address>>(list);
        }

        public Model.Address GetById(int id)
        {
            var entity = _context.Address.Where(x => x.AddressId == id).Include(x => x.City).Include(x => x.City.Country).SingleOrDefault();
            return new Model.Address
            {
                AddressId = entity.AddressId,
                City = entity.City.Name,
                CityId = entity.CityId,
                Name = entity.Name,
                Country = entity.City.Country.Name,
                StreetNumber = entity.StreetNumber,
                CountryId = entity.City.CountryId
            };
        }

        public Model.Address Insert(AddressInsertUpdateRequest request)
        {
            var entity = _mapper.Map<Address>(request);

            _context.Add(entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Address>(entity);
        }

        public Model.Address Update(int id, AddressInsertUpdateRequest request)
        {
            var entity = _context.Address.Find(id);

            _mapper.Map(request, entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Address>(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.Address.Find(id);

            _context.Address.Remove(entity);
            _context.SaveChanges();
        }
    }
}
