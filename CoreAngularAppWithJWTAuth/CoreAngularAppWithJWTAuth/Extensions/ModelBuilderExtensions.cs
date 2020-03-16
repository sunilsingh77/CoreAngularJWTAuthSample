using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAngularAppWithJWTAuth.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(
                new { Id = Guid.NewGuid().ToString(), Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = Guid.NewGuid().ToString(), Name = "Customer", NormalizedName = "CUSTOMER" },
                new { Id = Guid.NewGuid().ToString(), Name = "Moderator", NormalizedName = "MODERATOR" }
            );
        }
    }
}
