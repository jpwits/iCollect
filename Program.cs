using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using iCollect.Entities;
using iCollect;
using TGIS.Web.DAL;

namespace TGIS.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
			var host = CreateWebHostBuilder(args).Build();

			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				try
				{
					var context = services.GetRequiredService<NorthwindContext>();
					//if (context.Database.EnsureDeleted()) ///!!!-Note Live db in use...switch first!!!!
					//{

					//}

					//if (context.Database.EnsureCreated()) //This will wipe and re-create the dB...Yes!
					//{
					//	DbInitializer.Initialize(context);  // Seed with Dummy data
					//}
				}
				catch (Exception ex)
				{
					var logger = services.GetRequiredService<ILogger<Program>>();
					logger.LogError(ex, "An error occurred creating the DB.");
				}
			}

			host.Run();
		}

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                //.UseKestrel()
                //.UseContentRoot(Directory.GetCurrentDirectory())
                //.UseSetting("detailedErrors", "true")
                //.UseIISIntegration()
                .UseStartup<Startup>();

        //.CaptureStartupErrors(true);
    }
}
