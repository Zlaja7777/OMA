using System;
namespace OMA.Model
{
    public class ClientCounterOfProjects
    {
        public int numberOfProjects { get; set; }
        public int activeProjects { get; set; }
        public int finishedProjects { get; set; }

        public int paidProjects { get; set; }
        public int remainingToPay { get; set; }

    }
}
