using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebOlimpiada.ViewModels;

namespace WebOlimpiada.Data
{
    public class SeederDB
    {
        public static void SeedCategories(ApplicationDbContext context)
        {
            string[] categories = 
            {
                "Mobile", "Laptop", "Pen"
            };
            foreach(var name in categories)
            {
                var dbCat = context.Categories.SingleOrDefault(c=>c.Name==name);
                if(dbCat==null)
                {
                    Category category = new Category()
                    {
                        Name = name
                    };
                    context.Categories.Add(category);
                    context.SaveChanges();
                }
            }

            ProductViewModel[] products =
            {
                new ProductViewModel { Name= "IPhone", Category=categories[0] },
                new ProductViewModel { Name= "Asus ZenBook", Category=categories[1] },
                new ProductViewModel { Name= "Green Pen", Category=categories[2] }
            };
            foreach (var p in products)
            {
                var dbProd = context.Products.SingleOrDefault(c => c.Name == p.Name);
                if (dbProd == null)
                {
                    var dbCat = context.Categories.SingleOrDefault(c => c.Name == p.Category);
                    if (dbCat != null)
                    {
                        Product product = new Product
                        {
                            Name = p.Name,
                            CategoryId = dbCat.Id
                        };
                        context.Products.Add(product);
                        context.SaveChanges();
                    }
                }
            }
        }
        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                SeederDB.SeedCategories(context);
            }
        }
    }
}
