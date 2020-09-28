using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OMA.Model.Requests;
using OMA.WebAPI.Database;
using OMA.WebAPI.Filters;
using OMA.WebAPI.Interfaces;
using OMA.WebAPI.Other;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OMA.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationSettings _appSettings;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly e002022Context _context;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<ApplicationSettings> appSettings, e002022Context context,
            IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
            _emailService = emailService;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Model.Requests.RegisterRequest request)
        {
            if (request.Password == request.ConfirmPassword)
            {
                var userCheck = await _userManager.FindByEmailAsync(request.Email);

                if (userCheck != null)
                {
                    return BadRequest("Email already exists");
                }

                Address address = new Address
                {
                    CityId = request.CityId.GetValueOrDefault(),
                    Name = request.Address,
                    StreetNumber = request.StreetNumber
                };

                _context.Address.Add(address);
                _context.SaveChanges();

                var user = new AppUser
                {
                    AddressId = address.AddressId,
                    BankAccountNumber = request.BankAccountNumber,
                    CompanyName = request.CompanyName,
                    Email = request.Email,
                    FirstName = request.FirstName,
                    Iban = request.Iban,
                    LastName = request.LastName,
                    PhoneNumber = request.PhoneNumber,
                    Swift = request.Swift,
                    UserName = request.Email
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {

                    return Ok();
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest("Password do not match");
            }
        }

      

        [HttpPost("login")]
        public async Task<IActionResult> Login(Model.Requests.LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Email);
            
            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {
                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescription);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            } 
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }
        
        [HttpPost("passwordchange/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] PasswordChangeRequest request)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (request.NewPassword == request.ConfirmPassword)
            {
                var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                if (result.Succeeded)
                {
                    return Ok(new { response = "Password is sucesssfully changed!" });
                }
                else
                {
                    return BadRequest("Current password is not correct");
                }
            }
            else
            {
                return BadRequest("New password and confirm password are not equal");
            }
        }

        [HttpPost("forgot-password")]
        public async void ForgotPassword(ForgotPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
           
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

             

                var queryParams = new Dictionary<string, string>()
                {
                    {"token", token },
                    {"newEmail", request.Email }
                };

                var url = _appSettings.WebAppURL + "//account/password-reset";
                //var confLink = url + "?token=" + token + "&newEmail=" + request.Email;
                //var url = _appSettings.WebAppURL + "/account/password-reset";
                var confLink = QueryHelpers.AddQueryString(url, queryParams);
                StringBuilder sb = new StringBuilder(confLink);
                sb[_appSettings.WebAppURL.Length] = '#';
                confLink = sb.ToString();
                var htmlCode = "<p>Change your password <a href=\"" + confLink + "\">here</a></p>";
                var message = new EmailMessage(new string[] { request.Email }, "Change password", htmlCode);

                _emailService.SendEmail(message);
            }
           
        }

    

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);

                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Reset token is not valid");
                }
            }
            else
            {
                return BadRequest("Can't find account with that email.");
            }
        }

    }
}