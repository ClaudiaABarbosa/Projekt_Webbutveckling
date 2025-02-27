using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PetPawtner.Models;
using System.Diagnostics;
using System.Security.Claims;

namespace PetPawtner.Controllers
{
    public class HomeController : Controller
    {
    
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CreateAccount()
        {
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(User newUser)
        {
            using (ModelsContext db = new ModelsContext())
            {
                db.Users.Add(newUser);
                db.SaveChanges();
            }
            return RedirectToAction("Index", "LogIn");
        }
    }
}
