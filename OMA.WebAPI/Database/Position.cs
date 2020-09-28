using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Position
    {
        public Position()
        {
            WorkerPosition = new HashSet<WorkerPosition>();
        }

        public int PositionId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<WorkerPosition> WorkerPosition { get; set; }
    }
}
