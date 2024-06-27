import { db } from "@/lib/db";

async function main() {
  const branches = [
    {
      name : "Mall Ciputra",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.718846059493!2d106.78249832695312!3d-6.168390700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f65b320fb573%3A0xc1a27eebd0600293!2sMal%20Ciputra%20Jakarta%20-%20Citraland%20Mall!5e0!3m2!1sen!2sid!4v1719416408788!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "18:00",
      branchTelp: "(021) 566 9749",
      address: "Jl. Arteri S. Parman, Grogol Lt. UG",
  },
  {
      name : "Citra Garden 7",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.890764597812!2d106.70072139999999!3d-6.1453715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f80cd687ee49%3A0xd6dd1ac2b00c5935!2sJl.%20Citra%20Garden%20VII%2C%20RW.11%2C%20Kec.%20Kalideres%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011840!5e0!3m2!1sen!2sid!4v1719416604502!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "19:00",
      branchTelp: "021- 295 18 557",
      address: "Jl Citra Garden 7 Lt.1 Jakarta Barat 11840",
  },
  {
      name : "Taman Palem Mall",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9378734961897!2d106.7331559!3d-6.139048799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7fd118d23f3%3A0x41e43c4eda3307fe!2sJl.%20Kamal%20Raya%20Outer%20Ring%20Road%2C%20RW.14%2C%20Cengkareng%20Tim.%2C%20Kecamatan%20Cengkareng%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011730!5e0!3m2!1sen!2sid!4v1719416692029!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "21:00",
      branchTelp: "(021) 29725162",
      address: "Jl Kamal Raya Outher Ring Road Lt. Dasar cengkareng jak bar 11730",
  },
  {
      name : "Mall Puri Indah",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5635560232727!2d106.7333683!3d-6.1891101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f77aced9d48d%3A0x531d819851abf74f!2sMall%20Puri%20Indah%2C%20Jl.%20Puri%20Agung%20No.Lt.%201%20106%2C%20RT.1%2FRW.2%2C%20Kembangan%20Sel.%2C%20Kec.%20Kembangan%2C%20Kembangan%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011610!5e0!3m2!1sen!2sid!4v1719416777693!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "20:00",
      branchTelp: "021-2158-2250-2",
      address: "Jl. Puri Agung Lt.1, Kembangan Unit 106",
  },
  {
      name : "Thamrin Plaza",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0034943876685!2d98.69232029999999!3d3.586671800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131b1ea6a1789%3A0x95497672ed1a7e8!2sThamrin%20Plaza!5e0!3m2!1sen!2sid!4v1719416885030!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "20:00",
      branchTelp: "(061) 735 4917",
      address: "Jl. MH Thamrin Lt. Dasar",
  },
  {
      name : "Medan Fair",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9786150880236!2d98.663167!3d3.5923783999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131d9a14d530b%3A0xd6a7308b04df6237!2sPlaza%20Medan%20Fair!5e0!3m2!1sen!2sid!4v1719416923669!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "20:00",
      branchTelp: "(021) 33912231",
      address: "Jl. Jend. Gatot Subroto No.30 Lt. 2",
  },
  {
      name : "Center Point Medan",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9812689995597!2d98.6810989!3d3.5917701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131c7935d2b11%3A0x4d9985cafc1a23c6!2sCentre%20Point%20Mall%20(Medan)!5e0!3m2!1sen!2sid!4v1719417017461!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "21:00",
      branchTelp: "(061) 80510507",
      address: "JLt 3 Unit L3-05 jl. Jawa Kel gg Buntu Kec Medan Timur",
  },
  {
      name : "Dago",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0775787667053!2d107.6159938!3d-6.8813097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6512eddb7b1%3A0x30ba2e4e284debdc!2sJl.%20Dago%2C%20Kecamatan%20Coblong%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1719417077414!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "18:00",
      branchTelp: "(021) ",
      address: "Jl. Dago, Coblong",
  },
  {
      name : "Palembang Square",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4446421972852!2d104.74072849999999!3d-2.9740321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75c6609ee389%3A0x986cbfd2ce40fd52!2sJl.%20Angkatan%2045%2C%20Kota%20Palembang%2C%20Sumatera%20Selatan!5e0!3m2!1sen!2sid!4v1719417206310!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "18:00",
      branchTelp: "(0711) 369 145",
      address: "Jl. Angkatan 45 Kampus Pom IX Lt.3 U.169-175",
  },
  {
      name : "Palembang Trade Center",
      locationURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31875.557137578282!2d104.74072850000002!3d-2.9740321000000054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77e681e34fe3%3A0xa8b8c4c7c242a1e4!2sPalembang%20Trade%20Centre%20Mall!5e0!3m2!1sen!2sid!4v1719417261654!5m2!1sen!2sid",
      openingTime: "09:00",
      closingTime: "21:00",
      branchTelp: "(0711) 382242",
      address: "Jl. R. Sukamto No. 8 A Lt.1",
  }
  ];

  for (const branch of branches) {
    await db.branch.create({
      data: branch,
    });
  }
  console.log('Branches seeded successfully');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
