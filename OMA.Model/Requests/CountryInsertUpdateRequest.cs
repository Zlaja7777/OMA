using System.ComponentModel.DataAnnotations;

namespace OMA.Model.Requests
{
    public class CountryInsertUpdateRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
