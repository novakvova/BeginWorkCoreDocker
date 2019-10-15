using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebOlimpiada.Data;
using WebOlimpiada.ViewModels;

namespace WebOlimpiada.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetProducts()
        {
            var model = _context.Products.Select(p => new ProductViewModel
            {
                Id = p.Id,
                Name = p.Name,
                Category = p.Category.Name
            }).ToList();

            return Ok(model);
        }
    }
}