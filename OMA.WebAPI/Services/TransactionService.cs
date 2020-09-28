using System;
using AutoMapper;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace OMA.WebAPI.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly e002022Context _context;
        private readonly IMapper _mapper;
        public TransactionService(e002022Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Model.Transaction GetById(int id)
        {
            var entity = _context.Transaction.Find(id);
            return _mapper.Map<Model.Transaction>(entity);
        }

        public Model.TransactionProgressBar GetProgressBarValue(int id)
        {
            Model.TransactionProgressBar model = new Model.TransactionProgressBar();
            List <Transaction> entity = _context.Transaction.Where(w => w.OfferId == id).ToList();
            float amount = 0;
            float progress = 0;
            foreach (var i in entity)
            {
                amount += i.Amount;
            }
            progress = (amount / (float)_context.Offer.Where(w => w.OfferId == id).FirstOrDefault().TotalPrice) * 100;

            model.amountOfPaidTransactions = amount;
            model.progressBarValue = progress;
            return model;
        }

        public IList<Model.Transaction> GetAll(TransactionSearchRequest t)
        {
            var query = _context.Transaction.AsQueryable();

            if (t?.OfferId.HasValue == true)
            {
                query = query.Where(x => x.OfferId == t.OfferId);
            }

            var list = query.ToList();


            return _mapper.Map<IList<Model.Transaction>>(list);
        }
        public Model.Transaction Insert (TransactionInsertUpdateRequest t)
        {
          
            var entity = _mapper.Map<Transaction>(t);
            checkPaidAtribute(t.OfferId, t.Amount);
            _context.Add(entity);
            
            _context.SaveChanges();


            return _mapper.Map<Model.Transaction>(entity);
        }

        void checkPaidAtribute(int OfferId, float Amount)
        {
            var sum = _context.Transaction.Where(w => w.OfferId == OfferId).Sum(s => s.Amount);
            var reaminingToPay = _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().TotalPrice - (decimal)sum;
            if (Amount == (float)reaminingToPay)
            {
                _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().Paid = true;
            }
            else
            {
                _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().Paid = false;
            }

        }
        void checkEditPaidAtribute(int OfferId)
        {   
            var sum = _context.Transaction.Where(w => w.OfferId == OfferId).Sum(s => s.Amount);
            var reaminingToPay = _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().TotalPrice;
            if ((float)reaminingToPay == sum)
            {
                _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().Paid = true;
            }
            else
            {
                _context.Offer.Where(w => w.OfferId == OfferId).FirstOrDefault().Paid = false;
            }
            _context.SaveChanges();

        }
        public Model.Transaction Update (int id, TransactionInsertUpdateRequest t)
        {

            var entity = _context.Transaction.Find(id);
            _mapper.Map(t, entity);
            _context.SaveChanges();
            checkEditPaidAtribute(entity.OfferId);

            return _mapper.Map<Model.Transaction>(entity);
        }

        public void Delete (int id)
        {
            var entity = _context.Transaction.Find(id);
            checkPaidAtribute(entity.OfferId, entity.Amount);
            _context.Transaction.Remove(entity);
            _context.SaveChanges();

        }
    }
}
