using System;
using OMA.WebAPI.Other;

namespace OMA.WebAPI.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(EmailMessage message);
    }
}
