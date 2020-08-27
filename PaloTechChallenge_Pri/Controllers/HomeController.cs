using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaloTechChallenge_Pri.Controllers
{
    [Route("api/[controller]")]
    public class HomeController
    {
        [HttpGet("[action]")]
        public string[] GetIllnesses()
        {
            string[] illnesses = new []
            {
                "Mortal Cold" ,"Happy Euphoria", "Withering Parasite", "Death's Delusions", "Intense Intolerance"

            };
            return illnesses;
        }

    }

    public class Illnesses
    {
        public string Name { get; set; }
        public int Id { get; set; }
    }
}   

        

