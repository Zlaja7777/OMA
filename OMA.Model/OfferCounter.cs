using System;
using System.Collections.Generic;
using System.Text;

namespace OMA.Model
{
    public class OfferCounter
    {
        public int WaitingOffers { get; set; }
        public int AcceptedOffers { get; set; }
        public int InProgressOffers { get; set; }
        public int DeniedOffers { get; set; }
        public int DoneOffers { get; set; }
    }
}
