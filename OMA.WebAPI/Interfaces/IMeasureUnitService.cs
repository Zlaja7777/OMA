using System.Collections.Generic;

namespace OMA.WebAPI.Interfaces
{
    public interface IMeasureUnitService
    {
        IList<Model.MeasureUnit> GetAll();
        Model.MeasureUnit GetById(int id);
    }
}
