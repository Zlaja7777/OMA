using System;
using AutoMapper;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace OMA.WebAPI.Services
{
 
     public class ProjectTasksService : IProjectTasksService
    {
         private readonly e002022Context _context;
         private readonly IMapper _mapper;

         public ProjectTasksService(e002022Context context, IMapper mapper)
         {
               _context = context;
               _mapper = mapper;

         }

         public IList<Model.ProjectTasksData> GetAll(ProjectTasksSearchRequest request)
         {


            var list = new List<Model.ProjectTasksData>();
            list = _context.ProjectTasks.Where(w => w.OfferId == request.OfferId).Select(s => new Model.ProjectTasksData
            {
                ProjectTasksId = s.ProjectTasksId,
                Amount = s.Amount,
                OfferId = s.OfferId,
                Paid = s.Paid,
                Name = s.Name,
                WorkDays = s.WorkDays,
                Worker = s.Worker.FirstName + " " + s.Worker.LastName,
                WorkerId = s.WorkerId
            })
            .ToList();

             return _mapper.Map<IList <Model.ProjectTasksData>>(list);
          }

            public Model.ProjectTasks GetById(int id)
            {
                 var entity = _context.ProjectTasks.Find(id);
                 return _mapper.Map<Model.ProjectTasks>(entity);
            }
            public Model.ProjectTasks Insert(ProjectTasksInsertUpdateRequest t)
            {

                var entity = _mapper.Map<ProjectTasks>(t);
            
                _context.Add(entity);

                _context.SaveChanges();


                return _mapper.Map<Model.ProjectTasks>(entity);
            }
            public Model.ProjectTasks Update(int id, ProjectTasksInsertUpdateRequest t)
            {

   
                var entity = _context.ProjectTasks.Find(id);
             
                _mapper.Map(t, entity);
                _context.SaveChanges();

                return _mapper.Map<Model.ProjectTasks>(entity);
            }

            public void Delete(int id)
            {
            var entity = _context.ProjectTasks.Find(id);
            _context.ProjectTasks.Remove(entity);
            _context.SaveChanges();
        }



    }
    
}
