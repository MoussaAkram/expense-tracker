using Microsoft.AspNetCore.Mvc;
using Back_end.Service;
using Back_end.Model.Request;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.AuthenticateUserAsync(request.Username, request.Password);
            if (result == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new { Token = result.Value.Token, UserId = result.Value.UserId });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterUserAsync(request);
            if (result == "User with this email already exists.")
            {
                return BadRequest(result);
            }
            return Ok(new { message = result });
        }
    }
}