using Microsoft.EntityFrameworkCore;

namespace PetPawtner.Models
{
    public class ModelsContext : DbContext
    {
        public DbSet<User> Users { get; set; } //Dbset en databas som skapas genom kod istället för att manuellt skapa den.  
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Breed> Breeds { get; set; }
        public ModelsContext()
        {
            Database.EnsureCreated(); //se till att databasen skapas.
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source= siteData.db");
        }
    }
}
