using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using PetPawtner.Models;

namespace PetPawtner.Controllers
{
    public class UserPageController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult MyPets()
        {
            using (ModelsContext db = new ModelsContext())
            {

                List<Pet> petsList = db.Pets.ToList();
                return View(petsList);
            }
         
        }
        public IActionResult PetProfile()
        {
            return View();
        }

        public async Task<IActionResult> SignOutUser()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }
    }
}
