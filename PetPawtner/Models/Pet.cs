namespace PetPawtner.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public int BreedId { get; set; }  
        public Breed Breed { get; set; } //Skapar eett objekt av klassen breed!

    }
}
