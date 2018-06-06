using Microsoft.AspNetCore.Mvc;

namespace AngularTest9.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class SampleDataController : ControllerBase
    {
		[HttpGet]
		public IActionResult Get()
		{
			return Ok("this worked");
		}
    }
}