using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
