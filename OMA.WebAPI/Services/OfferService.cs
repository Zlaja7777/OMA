using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OMA.Model;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OMA.WebAPI.Services
{
    public class OfferService : IOfferService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;

        public OfferService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<Model.Offer> GetAll(OfferSearchRequest request)
        {
            var query = _context.Offer.AsQueryable();


            if (request?.ClientId.HasValue == true)
            {
                query = query.Where(x => x.ClientId == request.ClientId);
            }

            var list = query.ToList();

            return _mapper.Map<IList<Model.Offer>>(list);
        }

        public DashboardOffer GetDashboardOffers(OfferSearchRequest request)
        {
            var dashboardOfferList = new DashboardOffer();

            var query = _context.Offer.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.AppUserId))
            {
                query = query.Where(x => x.AppUserId == request.AppUserId);
            }

            var list = query
                .Include(a => a.Client)
                .Include(a => a.Status)
                .Include(a => a.Currency)
                .OrderByDescending(a => a.OfferId)
                .ToList();

            foreach (var item in list)
            {
                var newOffer = new OfferData
                {
                    StatusId = item.StatusId,
                    ClientId = item.ClientId,
                    OfferId = item.OfferId,
                    Client = item.Client.FirstName + " " + item.Client.LastName,
                    OfferName = item.Name,
                    Status = item.Status.Name,
                    TotalPrice = item.TotalPrice.ToString() + " " + item.Currency.Tag
                };

                if ((item.StatusId == 1 || item.StatusId == 2 || item.StatusId == 4) && dashboardOfferList.OffersList.Count < 5)
                {
                    dashboardOfferList.OffersList.Add(newOffer);
                } else if (item.StatusId == 3 && dashboardOfferList.ActiveProjectsList.Count < 5)
                {
                    dashboardOfferList.ActiveProjectsList.Add(newOffer);
                }
                else if (dashboardOfferList.FinishedProjectsList.Count < 5 && item.StatusId == 5)
                {
                    dashboardOfferList.FinishedProjectsList.Add(newOffer);
                }
            }

            checkIfDeadlineExceeded();

            return dashboardOfferList;
        }
        void checkIfDeadlineExceeded()
        {
            foreach (var item in _context.Offer.Where(w => DateTime.Now > w.EndDate).ToList())
            {
                item.DeadlineExceeded = true;
            }
            _context.SaveChanges();
        }

        public Model.Offer GetById(int id)
        {

            var entity = _context.Offer.Find(id);
            return _mapper.Map<Model.Offer>(entity);
        }
        public List<Model.OfferData> GetByUserId(string UId)
        {

            var offers = new List<OfferData>();
            offers = _context.Offer.Where(w => w.AppUserId == UId).Select(s => new Model.OfferData
            {
                Client = s.Client.FirstName + " " + s.Client.LastName,
                ClientId = s.ClientId,
                OfferId = s.OfferId,
                OfferName = s.Name,
                Status = s.Status.Name,
                TotalPrice = s.TotalPrice.ToString() + " " + s.Currency.Tag,
                StatusId = s.StatusId,
                Currency = s.Currency.Tag,
                CurrencyId = s.CurrencyId


            }).ToList();
            return offers;
        }

        public Model.Offer Insert(OfferInsertUpdateRequest request)
        { 
            var entity = _mapper.Map<Database.Offer>(request);

            _context.Add(entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Offer>(entity);
        }

        public Model.Offer Update(int id, OfferInsertUpdateRequest request)
        {
            var entity = _context.Offer.Find(id);

            _mapper.Map(request, entity);
            _context.SaveChanges();

            return _mapper.Map<Model.Offer>(entity);
        }
        public void Delete(int id)
        {
            var entity = _context.Offer.Find(id);

            _context.Offer.Remove(entity);
            _context.SaveChanges();
        }

        public Model.OfferCounter GetOfferCounter(OfferSearchRequest request)
        {
            var query = _context.Offer.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request?.AppUserId))
            {
                query = query.Where(x => x.AppUserId == request.AppUserId);
            }

            var list = query.ToList();

            var offerCounter = new OfferCounter
            {
                AcceptedOffers = query.Where(a => a.StatusId == 2).Count(),
                DeniedOffers = query.Where(a => a.StatusId == 4).Count(),
                DoneOffers = query.Where(a => a.StatusId == 5).Count(),
                InProgressOffers = query.Where(a => a.StatusId == 3).Count(),
                WaitingOffers = query.Where(a => a.StatusId == 1).Count()
            };

            return offerCounter;
        }
    }
}
