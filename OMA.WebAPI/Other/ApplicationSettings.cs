using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Other
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
        public string WebAppURL { get; set; }
    }
}
