using System;
using System.Collections.Generic;

namespace iCollect.NW.NW_Entities
{
    public partial class Coins
    {
        public int CoinId { get; set; }
        public int? SetId { get; set; }
        public string Description { get; set; }
        public string CoinCode { get; set; }
        public double? Weight { get; set; }
        public string Denomination { get; set; }
        public byte[] ImageHeads { get; set; }
        public byte[] ImageTail { get; set; }
        public bool? UseImage { get; set; }

        public virtual Sets Set { get; set; }
    }
}
