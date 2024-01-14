/**
 * Starbuzz Coffee wants to integrate their condiiment options into their software systems.
 * In addition to the coffess, customers can add steamed milk, mocha, soy, or whip
 * to their coffee.
 *
 * To build this in a way that follows the principle of writing objects
 * that are closed for modification, but open for extension, we use
 * the Decorator Pattern to update the Starbuzz Coffee software to meet this
 * requirement.
 *
 * For the requirement to account for size of the beverage
 * when adding costs for Soy milk, see the Soy class!
 *
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */

import { Beverage, Size } from "./coffees/Beverage";
import { Espresso } from "./coffees/Espresso";
import { HouseBlend } from "./coffees/HouseBlend";
import { Mocha } from "./condiments/Mocha";
import { Soy } from "./condiments/Soy";
import { SteamedMilk } from "./condiments/SteamedMilk";
import { Whip } from "./condiments/Whip";

function printOrder(beverage: Beverage) {
  console.log(
    `${beverage.getDescription()}, size ${beverage.getSize()}, costs $${beverage.cost()}`
  );
}

const espresso = new Espresso();
printOrder(espresso);

const houseBlend = new HouseBlend();
printOrder(houseBlend);

const mocha = new Mocha(houseBlend);
printOrder(mocha);

const houseBlendWithSteamedMilk = new SteamedMilk(houseBlend);
printOrder(houseBlendWithSteamedMilk);

const mochaWithWhip = new Whip(mocha);
printOrder(mochaWithWhip);

const coffeeWithSoy = new Soy(espresso);
printOrder(coffeeWithSoy);

const ventiEspresso = new Espresso();
ventiEspresso.setSize(Size.Venti);
const ventiCoffeeWithSoy = new Soy(ventiEspresso);
printOrder(ventiCoffeeWithSoy);
