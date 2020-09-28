
using OMA.Model.Requests;
using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface ITransactionService
    {
        

        Model.Transaction GetById(int id);
        Model.TransactionProgressBar GetProgressBarValue(int id);
        IList<Model.Transaction> GetAll(TransactionSearchRequest t);
        Model.Transaction Insert(TransactionInsertUpdateRequest t);
        Model.Transaction Update(int id, TransactionInsertUpdateRequest t);
        void Delete(int id);
    }
}
