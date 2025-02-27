using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PetPawtner.Models;
using System.Security.Claims;

namespace PetPawtner.Controllers
{
    public class LogInController : Controller
    {
        public IActionResult Index(string returnUrl = "")
        {
            @ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(User user, string returnUrl = "")
        {
            //Kolla inloggningen
            bool validUser = CheckUser(user);

            if (validUser)
            {
                // Logga in användaren
                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim(ClaimTypes.Name, user.Username));

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                if (returnUrl != "") //Om returnUrl inte är tom då vill jag använda den! dvs bli tillbakaskickad till start
                    return Redirect(returnUrl);
                else
                    // Skicka användaren till UserPage
                    return RedirectToAction("Index", "UserPage");
            }
            else //Om användare slå in fel användarnamn eller lösen. 
            {
                ViewBag.ErroMessage = "Inloggningen misslyckades";
                @ViewData["ReturnUrl"] = returnUrl;
                return View();
            }

        }
        private bool CheckUser(User user)
        {
            using (var db = new ModelsContext())
            {
                // Kontrollera om en användare med samma användarnamn och lösenord finns i databasen
                var validUser = db.Users
                    .FirstOrDefault(u => u.Username.ToLower() == user.Username.ToLower() && u.Password == user.Password);

                return validUser != null;
            }
        }
    }
}
