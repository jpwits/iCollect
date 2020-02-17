using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TGIS.Web.Entities;
using iCollect.NW.NW_Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
//using Atlassian.Connect;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace TGIS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();

            });
            services.AddCors(o => o.AddPolicy("AppPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            //Database Connection
            var connection = @"Data Source=DESKTOP-7DQTMIU\SQLEXPRESS;Initial Catalog=Northwind;Trusted_Connection=True;";
            services.AddDbContext<NorthwindContext>(options => options.UseSqlServer(connection));

            //services.AddAtlassianConnect<IConnectDescriptorProvider>(opt =>
            //{
            //    opt.InstallCallbackPath = "/installed";
            //    opt.AddOnKey = "com.example.myaddon.kg73.local";
            //})
            //.AddInMemoryPersister();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }

            // Middleware to handle all request
            app.Use(async (context, next) =>
               {
                   await next();
                   if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                   {
                       context.Request.Path = "/index.html";
                       context.Response.StatusCode = 200;
                       await next();
                   }
               });

            //DefaultFilesOptions options = new DefaultFilesOptions();
            //options.DefaultFileNames.Clear();
            //options.DefaultFileNames.Add("/index.html");
            //app.UseDefaultFiles(options);
            app.UseStaticFiles();
            app.UseFileServer(enableDirectoryBrowsing: false);
            //app.UseAtlassianConnect();
            app.UseMvc(routes =>
            {
                //routes.MapRoute(
                //       name: "Services",
                //       template: "GetServices",
                //       defaults: new { controller = "Services", action = "GetServices" });

                routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

        }
    }
}
