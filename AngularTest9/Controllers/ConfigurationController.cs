using AngularTest9.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AngularTest9.Controllers
{
	[Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
		private readonly AuthConfiguration _authConfiguration;


		public ConfigurationController(IOptions<AuthConfiguration> authConfiguration)
		{
			_authConfiguration = authConfiguration.Value;
		}


		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_authConfiguration);
		}
	}
}