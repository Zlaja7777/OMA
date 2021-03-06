﻿using System;
using System.Collections.Generic;
using System.Text;

namespace OMA.Model.Requests
{
    public class WorkerInsertUpdateRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public int NumberOfActiveProjects { get; set; }
        public bool IsActive { get; set; }
        public string BankAccountNumber { get; set; }
        public int AddressId { get; set; }
        public string PhoneNumber { get; set; }
        public string Availability { get; set; }
        public string Email { get; set; }
        public float MaxHoursPerWeek { get; set; }
        public float MaxHoursPerMonthActual { get; set; }
        public float MaxHoursPerMonthBudgeted { get; set; }
        public string AppUserId { get; set; }
    }
}
