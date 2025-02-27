using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PetPawtner.Models;

namespace PetPawtner.Controllers
{
    public class PetController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            using (ModelsContext db = new ModelsContext())
            {
                ViewBag.BreedId = new SelectList(db.Breeds.ToList(), "Id", "BreedName"); // För att kunna se det i en dropdown lista
                List<Pet> petList = db.Pets.ToList();
                return View(petList);
            }
        }

        public IActionResult Create()
        {
            using (ModelsContext db = new ModelsContext())
            {
                ViewBag.BreedId = new SelectList(db.Breeds.ToList(), "Id", "BreedName"); 
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Pet newPet)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Pets.Add(newPet);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                ViewBag.BreedId = new SelectList(db.Breeds.ToList(), "Id", "BreedName");
                Pet pet = db.Pets.Find(id);
                return View(pet);
            }
        }

        [HttpPost]
        public IActionResult Edit(Pet pet)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Update(pet);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
        }

        public IActionResult Details(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                ViewBag.BreedId = new SelectList(db.Breeds.ToList(), "Id", "BreedName");
                Pet pet = db.Pets.Find(id);
                return View(pet);
            }
        }

        public IActionResult Delete(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                Pet pet = db.Pets.Find(id);
                return View(pet);
            }
        }

        [HttpPost]
        public IActionResult Delete(Pet pet)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Pets.Remove(pet);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
        }
    }

}
