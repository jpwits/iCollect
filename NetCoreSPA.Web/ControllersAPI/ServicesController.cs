using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iCollect.NW.NW_Entities;
using iCollect.enums;
using TGIS.Web.Models;
using Microsoft.AspNetCore.Cors;
using iCollect.Enums;
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Security.Cryptography.X509Certificates;

namespace iCollect.ControllersAPI
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public ServicesController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet("{from, to, qtype, stype}"), Route("GetServices")]
        public async Task<List<DatePoint>> GetServices(DateTime from, DateTime to, QueryTypeEnum qtype = 0, ServiceTypeEnum stype = 0)
        {
            var dateList = new List<DatePoint>();

            foreach (var curservice in Enum.GetValues(typeof(ServiceTypeEnum)))
            {
                if (stype != ServiceTypeEnum.All)
                {
                    dateList = PlusSingleDay(dateList, from, to);
                    return dateList; //return for single Enum
                }
                else
                {
                    if ((ServiceTypeEnum)curservice != ServiceTypeEnum.All)
                    {
                        var singleDateList = new List<DatePoint>();
                        singleDateList = PlusSingleDay(singleDateList, from, to);
                        dateList = singleDateList.Select((dp, i) =>
                                new DatePoint() { x = dp.x, y = dp.y + (dateList.Count != 0 ? dateList[i].y : 0) }
                                ).ToList();
                    }
                }
            }
            return dateList; //return for All Enum (totals)
        }


        //Note thes random generation will be replaced by sql calls!!
        public List<DatePoint> PlusSingleDay(List<DatePoint> dateList, DateTime from, DateTime to)
        {
            foreach (DateTime day in EachDay(from, to))
            {
                dateList.Add(new DatePoint() { x = day, y = new Random().Next(10, 30) });
            }
            return dateList;
        }

        public IEnumerable<DateTime> EachDay(DateTime from, DateTime to)
        {
            for (var day = from.Date; day.Date <= to.Date; day = day.AddDays(1))
                yield return day;
        }

        public IEnumerable<DateTime> EachMonth(DateTime from, DateTime to)
        {
            for (var month = from.Date; month.Date <= to.Date; month = month.AddMonths(1))
                yield return month;
        }

        [HttpGet, Route("GetServicesTypes")]
        public async Task<Dictionary<int, string>> GetServiceTypes()
        {
            Type tSrvType = typeof(ServiceTypeEnum);
            return Enum.GetNames(tSrvType).ToDictionary(t => (int)System.Enum.Parse(tSrvType, t), t => t);
        }

        [HttpGet("{from, to, qtype}"), Route("GetServicesStatuses")]
        public async Task<ServiceStatus> GetServicesStatuses(DateTime from, DateTime to, QueryTypeEnum qtype = 0)
        {

            //Ok structuring data in the stack chart format 4 now, but once db used, pass sql struct through and move restruct to Portal,
            //thus Portal structures correct, but check return affter db access!!

            var serviceStatus = new ServiceStatus() { ServiceTypes = new List<string>() ,
                    StatusValues = new List<StatusTypeValue>()};

            foreach (var curservice in Enum.GetValues(typeof(ServiceTypeEnum)))
            {
                if ((ServiceTypeEnum)curservice != ServiceTypeEnum.All)
                {
                    serviceStatus.ServiceTypes.Add(Enum.GetName(typeof(ServiceTypeEnum), curservice));
                }
            }

            foreach (var curstatus in Enum.GetValues(typeof(StatusTypeEnum)))
            {
                var statusTypeValue = new StatusTypeValue()
                {
                    Status = Enum.GetName(typeof(StatusTypeEnum),curstatus),
                    ServiceValues = new List<int>()
                };

                foreach (var curservice in Enum.GetValues(typeof(ServiceTypeEnum)))
                {
                    if ((ServiceTypeEnum)curservice != ServiceTypeEnum.All)
                    {
                        statusTypeValue.ServiceValues.Add(new Random().Next(3, 13));
                    }
                    //Could also populate Servicetypes here...but will be replaced!!
                }
                serviceStatus.StatusValues.Add(statusTypeValue);
            }

            return serviceStatus;
        }
    }
}
