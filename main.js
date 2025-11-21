/**
 * Generuje seznam zaměstnanců v požadované struktuře (gender, birthdate, name, surname, workload).
 * Vstupem je dtoIn s počtem osob (count) a věkovým intervalem (age.min, age.max).
 * Výstupem je pole objektů zaměstnanců.
 *
 * Příklad vstupu:
 *   { count: 5, age: { min: 18, max: 60 } }
 *
 * Příklad výstupu (1 záznam):
 *   { gender: "male", birthdate: "1993-08-07T00:00:00.000Z", name: "Jan", surname: "Novák", workload: 40 }
 *
 * Poznámka: Datum narození generujeme tak, aby skutečný věk byl v intervalu <min, max> (včetně hran).
 *           Používáme průměrný rok 365.25 dne, což stačí vzhledem k toleranci testů.
 *
 * @param {object} dtoIn - Vstupní data (počet a věkový interval)
 * @param {number} dtoIn.count - Počet zaměstnanců, které máme vygenerovat
 * @param {object} dtoIn.age - Objekt s minimálním a maximálním věkem
 * @param {number} dtoIn.age.min - Minimální věk (v letech, reálné číslo)
 * @param {number} dtoIn.age.max - Maximální věk (v letech, reálné číslo)
 * @returns {Array<object>} Pole zaměstnanců s požadovanými informacmi
 */
export function main(dtoIn) {
    // pole českých jmen pro muže a pro ženy.
    const maleNames = ["Jan", "Petr", "Lukáš", "Tomáš", "Jiří", "Martin", "Karel", "Ondřej", "Václav", "Marek"];
    const femaleNames = ["Jana", "Petra", "Lucie", "Tereza", "Eva", "Marie", "Hana", "Alena", "Veronika", "Kateřina"];
  
    // Příjmení rozdělené na mužské a ženské
    //    U ženských příjmení vytvořeno samostatné pole, protože nefungovalo mechanicky přidat "-ová" k mužskému příjmení (např. Outrata -> Outratová).
    const maleSurnames = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Kučera", "Outrata", "Pokorný", "Král", "Sedláček"];
    const femaleSurnames = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Kučerová", "Outratová", "Pokorná", "Králová", "Sedláčková"];
  
    // Úvazky dle zadání: 10 / 20 / 30 / 40 hodin týdně.
    const workloads = [10, 20, 30, 40];
  
    // pole pro vygenerované zaměstnance.
    const employees = [];
  
    // generování tolika zaměstnanců, kolik je v dtoIn.count.
    for (let i = 0; i < dtoIn.count; i++) {
      // Pohlaví určíme náhodně (pravděpodobnost 50:50).
      const gender = Math.random() < 0.5 ? "male" : "female";
  
      // Podle pohlaví vybereme křestní jméno z příslušného pole.
      const name =
        gender === "male"
          ? maleNames[randomInt(0, maleNames.length - 1)]
          : femaleNames[randomInt(0, femaleNames.length - 1)];
  
      // Podle pohlaví vybereme příjmení (mužské / ženské).
      const surname =
        gender === "male"
          ? maleSurnames[randomInt(0, maleSurnames.length - 1)]
          : femaleSurnames[randomInt(0, femaleSurnames.length - 1)];
  
      // Náhodně vybereme jeden z povolených úvazků (10 / 20 / 30 / 40).
      const workload = workloads[randomInt(0, workloads.length - 1)];
  
      // Vygenerujeme datum narození tak, aby věk byl v intervalu <min, max>.
      //    Používáme průměrnou délku roku (365.25 dne) 
      const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
  
      // sestavení objektu zaměstnance v požadované strkutře a přidání do pole.
      employees.push({ gender, birthdate, name, surname, workload });
    }
  
    // Vrátíme  pole zaměstnanců.
    return employees;
  }
  
  /**
   * Vrátí náhodné celé číslo včetně hran (min i max).
   * Používáme Math.floor nad Math.random(), aby bylo číslo celé.
   * @param {number} min - Dolní hranice (včetně)
   * @param {number} max - Horní hranice (včetně)
   * @returns {number} Náhodné celé číslo v intervalu <min, max>
   */
  function randomInt(min, max) {
    // Math.random() vrací číslo v intervalu <0, 1).
    // Násobením a posunem získáme požadovaný interval a Math.floor zaokrouhlí dolů.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Vygeneruje náhodné datum narození tak, aby výsledný věk byl v intervalu <minAge, maxAge>.
   * Postup:
   *  - vezmeme aktuální čas (teď),
   *  - spočítáme dvě hrany (nejmladší možný: "teď - minAge", nejstarší možný: "teď - maxAge"),
   *  - vybereme náhodný čas mezi těmito hranami.
   * @param {number} minAge - Minimální věk (v letech)
   * @param {number} maxAge - Maximální věk (v letech)
   * @returns {string} ISO datum narození (YYYY-MM-DDTHH:mm:ss.sssZ)
   */
  function generateBirthdate(minAge, maxAge) {
    // a) Aktuální datum/čas
    const now = new Date();
  
    // b) Počet milisekund v jednom „průměrném“ roku (365.25 dne).
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  
    // c) Nejmladší dovolené datum narození (má přesně minAge let).
    const youngest = new Date(now.getTime() - minAge * msPerYear);
  
    // d) Nejstarší dovolené datum narození (má přesně maxAge let).
    const oldest = new Date(now.getTime() - maxAge * msPerYear);
  
    // e) Náhodný timestamp mezi „oldest“ a „youngest“ (včetně).
    const randomTime = randomInt(oldest.getTime(), youngest.getTime());
  
    // f) Převedeme na ISO formát (testy kontrolují přesnost až na ms, ISO to splní).
    return new Date(randomTime).toISOString();
  }