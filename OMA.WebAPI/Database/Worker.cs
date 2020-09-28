using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Worker
    {
        public Worker()
        {
            WorkerPosition = new HashSet<WorkerPosition>();
        }
        public int WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public int NumberOfActiveProjects { get; set; }
        public bool IsActive { get; set; }
        public string BankAccountNumber { get; set; }
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Availability { get; set; }
        //Full time, Part time, Per project
        public string Email { get; set; }
        public float MaxHoursPerWeek { get; set; }
        public float MaxHoursPerMonthActual { get; set; }
        public float MaxHoursPerMonthBudgeted { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<WorkerPosition> WorkerPosition { get; set; }

    }
}
