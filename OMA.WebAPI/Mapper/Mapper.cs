using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMA.WebAPI.Mapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Database.Address, Model.Address>();

            CreateMap<Database.Country, Model.Country>();

            CreateMap<Model.Requests.CountryInsertUpdateRequest, Database.Country>();

            CreateMap<Database.Client, Model.Client>();
            CreateMap<Model.Requests.ClientInsertUpdateRequest, Database.Client>();
        
            CreateMap<Database.Currency, Model.Currency>();

            CreateMap<Database.Offer, Model.Offer>();

            CreateMap<Model.Requests.OfferInsertUpdateRequest, Database.Offer>();

            CreateMap<Database.MeasureUnit, Model.MeasureUnit>();

            CreateMap<Database.Worker, Model.Worker>();

            CreateMap<Model.Requests.WorkerInsertUpdateRequest, Database.Worker>();

            CreateMap<Database.City, Model.City>();

            CreateMap<Database.Address, Model.Address>();

            CreateMap<Model.Requests.AddressInsertUpdateRequest, Database.Address>();

            CreateMap<Database.Status, Model.Status>();

            CreateMap<Database.Transaction, Model.Transaction>();

            CreateMap<Model.Requests.TransactionInsertUpdateRequest, Database.Transaction>();

            CreateMap< Database.ProjectTasks, Model.ProjectTasks>();

            CreateMap<Model.Requests.ProjectTasksInsertUpdateRequest, Database.ProjectTasks>();




        }
    }
}
