using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class MeasureUnit
    {
        public MeasureUnit()
        {
            OfferServices = new HashSet<OfferServices>();
        }

        public int MeasureUnitId { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }

        public virtual ICollection<OfferServices> OfferServices { get; set; }
    }
}
