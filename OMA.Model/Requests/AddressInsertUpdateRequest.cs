using System.ComponentModel.DataAnnotations;

namespace OMA.Model.Requests
{
    public class AddressInsertUpdateRequest
    {
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string StreetNumber { get; set; }
        public int CityId { get; set; }
    }
}
