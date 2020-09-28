using System;
namespace OMA.Model
{
    public class ProjectTasksData
    {
        public int ProjectTasksId { get; set; }
        public string Name { get; set; }
        public bool Paid { get; set; }
        public float Amount { get; set; }
        public int WorkerId { get; set; }
        public int OfferId { get; set; }
        public int WorkDays { get; set; }
        public string Worker { get; set; }
    }
}
