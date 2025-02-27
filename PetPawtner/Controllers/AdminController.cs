using Microsoft.AspNetCore.Mvc;
using PetPawtner.Models;

namespace PetPawtner.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            using (ModelsContext db = new ModelsContext())
            {
                List<User> userList = db.Users.ToList();
                return View(userList);
            }
        }

        public IActionResult DetailsUser(int id) 
        {
            using (ModelsContext db = new ModelsContext())
            {
                User user = db.Users.Find(id); // Fungerar endast på primärnycklar, inte sådant som kan finnas flera av.
                return View(user);
            }
        }

        public IActionResult EditUser(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                User user = db.Users.Find(id); 
                return View(user);
            }
        }

        [HttpPost]
        public IActionResult EditUser(User user)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Update(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

        }

        public IActionResult DeleteUser(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                User user = db.Users.Find(id); 
                return View(user);
            }
        }

        [HttpPost]
        public IActionResult DeleteUser(User user)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Users.Remove(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

        }

        public IActionResult CreateBreed()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CreateBreed(Breed newBreed)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Breeds.Add(newBreed);
                db.SaveChanges();
            }
            return RedirectToAction("DetailsBreed");
        }
        public IActionResult DetailsBreed(int id) 
        {
            using (ModelsContext db = new ModelsContext())
            {
                List<Breed> breedList = db.Breeds.ToList();
                return View(breedList);
            }
        }

        public IActionResult EditBreed(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                Breed breed = db.Breeds.Find(id); 
                return View(breed);
            }
        }

        [HttpPost]
        public IActionResult EditBreed(Breed breed)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Update(breed);
                db.SaveChanges();
                return RedirectToAction("DetailsBreed");
            }

        }

        public IActionResult DeleteBreed(int id)
        {
            using (ModelsContext db = new ModelsContext())
            {
                Breed breed = db.Breeds.Find(id); 
                return View(breed);
            }
        }

        [HttpPost]
        public IActionResult DeleteBreed(Breed breed)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Breeds.Remove(breed);
                db.SaveChanges();
                return RedirectToAction("DetailsBreed");
            }

        }

    }
}

