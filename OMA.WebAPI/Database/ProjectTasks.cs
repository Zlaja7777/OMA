using System;
namespace OMA.WebAPI.Database
{
    public class ProjectTasks
    {
        public ProjectTasks()
        {
        }
        public int ProjectTasksId { get; set; }
        public string Name { get; set; }
        public bool Paid { get; set; }
        public float Amount { get; set; }
        public int WorkerId { get; set; }
        public int OfferId { get; set; }
        public int WorkDays { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual Offer Offer { get; set; }

    }
}