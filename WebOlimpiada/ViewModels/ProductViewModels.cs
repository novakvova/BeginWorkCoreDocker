using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebOlimpiada.ViewModels
{
    public class ProductPageModel
    {
        public List<ProductViewModel> Data { get; set; }
        public int TotalPage { get; set; }
        public int CurrentPage { get; set; }
    }
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
    }
    public class ProductAddViewModel
    {
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Category { get; set; }
    }
    public class ProductEditViewModel
    {
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Category { get; set; }
    }
    
}
