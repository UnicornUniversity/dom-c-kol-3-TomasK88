
/**
 * @description Generuje seznam zaměstnanců podle zadaného počtu a věkového intervalu.
 * @param {object} dtoIn - Vstupní data
 * @param {number} dtoIn.count - Počet zaměstnanců
 * @param {object} dtoIn.age - Věkový interval
 * @param {number} dtoIn.age.min - Minimální věk
 * @param {number} dtoIn.age.max - Maximální věk
 * @returns {Array<object>} Pole zaměstnanců
 */
export function main(dtoIn) {
    const maleNames = ["Jan", "Petr", "Lukáš", "Tomáš", "Jiří", "Martin", "Karel", "Ondřej", "Václav", "Marek"];
    const femaleNames = ["Jana", "Petra", "Lucie", "Tereza", "Eva", "Marie", "Hana", "Alena", "Veronika", "Kateřina"];
    const maleSurnames = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Kučera", "Outrata", "Pokorný", "Král", "Sedláček"];
    const femaleSurnames = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Kučerová", "Outratová", "Pokorná", "Králová", "Sedláčková"];
    const workloads = [10, 20, 30, 40];
  
    const employees = [];
    for (let i = 0; i < dtoIn.count; i++) {
      const gender = Math.random() < 0.5 ? "male" : "female";
      const name = gender === "male"
        ? maleNames[randomInt(0, maleNames.length - 1)]
        : femaleNames[randomInt(0, femaleNames.length - 1)];
      const surname = gender === "male"
        ? maleSurnames[randomInt(0, maleSurnames.length - 1)]
        : femaleSurnames[randomInt(0, femaleSurnames.length - 1)];
      const workload = workloads[randomInt(0, workloads.length - 1)];
      const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
  
      employees.push({ gender, birthdate, name, surname, workload });
    }
    return employees;
  }
  
  /**
   * @description Vrátí náhodné celé číslo v intervalu.
   * @param {number} min - Dolní hranice
   * @param {number} max - Horní hranice
   * @returns {number} Náhodné číslo
   */
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * @description Vygeneruje náhodné datum narození podle věkového intervalu.
   * @param {number} minAge - Minimální věk
   * @param {number} maxAge - Maximální věk
   * @returns {string} Datum ve formátu ISO
   */
  function generateBirthdate(minAge, maxAge) {
    const now = new Date();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const maxDate = new Date(now.getTime() - minAge * msPerYear);
    const minDate = new Date(now.getTime() - maxAge * msPerYear);
    const randomTime = randomInt(minDate.getTime(), maxDate.getTime());
    return new Date(randomTime).toISOString();
  }
  