using System;
namespace OMA.Model.Requests
{
    public class ProjectTasksInsertUpdateRequest
    {
        public string Name { get; set; }
        public bool Paid { get; set; }
        public float Amount { get; set; }
        public int WorkerId { get; set; }
        public int ? OfferId { get; set; }
        public int WorkDays { get; set; }
    }
}
