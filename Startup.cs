using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using iCollect.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iCollect.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            services.AddCors(o => o.AddPolicy("AppPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddControllers()
                .AddNewtonsoftJson();

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    //options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });
            //services.AddMvc().AddJsonOptions(options =>
            //{
            //    //options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //    //options.SerializerSettings.ContractResolver = new DefaultContractResolver();

            //});
           
            //Database Connection
            //var connection = @"Data Source=DESKTOP-7DQTMIU\SQLEXPRESS;Initial Catalog=Northwind;Trusted_Connection=True;";
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(
                    Configuration.GetConnectionString("AuthConnection")));

            services.AddDbContext<icollectdbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("CollectConnection")));

            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
               .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthentication();

            services.AddControllersWithViews();
            services.AddRazorPages();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }

            // Middleware to handle all request
            //app.Use(async (context, next) =>
            //   {
            //       await next();
            //       if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            //       {
            //           context.Request.Path = "/index.html";
            //           context.Response.StatusCode = 200;
            //           await next();
            //       }
            //   });

            app.UseExceptionHandler("/api/errors/500");
            app.UseStatusCodePagesWithReExecute("/api/errors/{0}");

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseFileServer(enableDirectoryBrowsing: false);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

        }
    }
}
