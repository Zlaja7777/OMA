using System.Collections.Generic;

namespace OMA.Model
{
    public class DashboardOffer
    {
        public List<OfferData> OffersList { get; set; } = new List<OfferData>();
        public List<OfferData> ActiveProjectsList { get; set; } = new List<OfferData>();
        public List<OfferData> FinishedProjectsList { get; set; } = new List<OfferData>();
    }

    public class OfferData
    {
        public int OfferId { get; set; }
        public string OfferName { get; set; }
        public int ClientId { get; set; }
        public string Client { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public string TotalPrice { get; set; }
        public string Currency { get; set; }
        public int CurrencyId { get; set; }

    }
}
