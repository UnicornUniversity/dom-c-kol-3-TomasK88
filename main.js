
/**
 
* @description Generuje seznam zaměstnanců podle zadaného počtu a věkového intervalu.
 * @param {Object} dtoIn - Vstupní data, obsahuje počet zaměstnanců, věkový limit min a max
 * @param {number} dtoIn.count - Počet zaměstnanců
 * @param {Object} dtoIn.age - Věkový interval
 * @param {number} dtoIn.age.min - Minimální věk
 * @param {number} dtoIn.age.max - Maximální věk
 * @returns {Array} dtoOut - Pole zaměstnanců
 * @returns {string} dtoOut[].gender - pohlaví "male" nebo "female"
 * @returns {string} dtoOut[].birthdate - Datum narození ve formátu ISO
 * @returns {string} dtoOut[].name - Křestní jméno
 * @returns {string} dtoOut[].surname - Příjmení
 * @returns {number} dtoOut[].workload - Úvazek (10, 20, 30, 40)
 * 
 */


// Funkce main přijímá vstupní objekt dtoIn a vrací pole zaměstnanců
function main(dtoIn) {
    // Pole mužských a ženských jmen
    const maleNames = ["Jan", "Petr", "Lukáš", "Tomáš", "Jiří", "Martin", "Karel", "Ondřej", "Václav", "Marek"];
    const femaleNames = ["Jana", "Petra", "Lucie", "Tereza", "Eva", "Marie", "Hana", "Alena", "Veronika", "Kateřina"];
  
    // Pole příjmení pro muže a ženy, pole ženský příjmení je ručně, protože přidat k mužskému příjmení -ová nefufunguje vždycky.
    const maleSurnames = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Kučera", "Outrata", "Pokorný", "Král", "Sedláček"];
    const femaleSurnames = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Kučerová", "Outratová", "Pokorná", "Králová", "Sedláčková"];
  
    // Možné hodnoty úvazku
    const workloads = [10, 20, 30, 40];
  
    // Výstupní pole
    const employees = [];
  
    // Aktuální datum pro výpočet věku
    const now = new Date();
  
    // Pomocná funkce pro generování náhodného čísla v intervalu
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Pomocná funkce pro generování náhodného data narození podle věku
    function generateBirthdate(minAge, maxAge) {
      // Převod věku na milisekundy (365.25 dní * 24h * 60min * 60s * 1000ms)
      const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  
      // Vypočítáme nejstarší a nejmladší datum narození
      const maxDate = new Date(now.getTime() - minAge * msPerYear);
      const minDate = new Date(now.getTime() - maxAge * msPerYear);
  
      // Náhodné datum mezi minDate a maxDate
      const randomTime = randomInt(minDate.getTime(), maxDate.getTime());
      return new Date(randomTime).toISOString(); // ISO formát
    }
  
    // Generování zaměstnanců
    for (let i = 0; i < dtoIn.count; i++) {
      // Náhodně vybereme pohlaví
      const gender = Math.random() < 0.5 ? "male" : "female";
  
      // Podle pohlaví vybereme jméno a příjmení
      let name, surname;
      if (gender === "male") {
        name = maleNames[randomInt(0, maleNames.length - 1)];
        surname = maleSurnames[randomInt(0, maleSurnames.length - 1)];
      } else {
        name = femaleNames[randomInt(0, femaleNames.length - 1)];
        surname = femaleSurnames[randomInt(0, femaleSurnames.length - 1)];
      }
  
      // Náhodně vybereme úvazek
      const workload = workloads[randomInt(0, workloads.length - 1)];
  
      // Vygenerujeme datum narození podle věkového intervalu
      const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
  
      // Vytvoříme objekt zaměstnance
      const employee = {
        gender: gender,
        birthdate: birthdate,
        name: name,
        surname: surname,
        workload: workload
      };
  
      // Přidáme do pole
      employees.push(employee);
    }
  
    // Vrátíme výsledek
    return employees;
  }
  
  // --- Příklad použití ---
  // const dtoIn = { count: 5, age: { min: 18, max: 60 } };
  // console.log(main(dtoIn));
  
