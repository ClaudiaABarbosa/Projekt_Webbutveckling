using System;

namespace PetPawtner.Models
{
    public class Breed
    {
        public int Id { get; set; }
        public string BreedName { get; set; }

        public List<Pet> Pets { get; set; }
    }
}
