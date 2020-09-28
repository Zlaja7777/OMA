using System;
namespace OMA.Model.Requests
{
    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}
