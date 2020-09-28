using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface ICurrencyService
    {
        IList<Model.Currency> GetAll();
        Model.Currency GetById(int id);
    }
}
