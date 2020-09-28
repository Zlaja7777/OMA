using System;
using System.Collections.Generic;
using OMA.Model.Requests;

namespace OMA.WebAPI.Interfaces
{
    public interface IProjectTasksService
    {
        IList<Model.ProjectTasksData> GetAll(ProjectTasksSearchRequest request);
        Model.ProjectTasks GetById(int id);
        Model.ProjectTasks Insert(ProjectTasksInsertUpdateRequest t);
        Model.ProjectTasks Update(int id, ProjectTasksInsertUpdateRequest t);
        void Delete(int id);
    }
}
