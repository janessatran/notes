"use strict";
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
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */
exports.__esModule = true;
var Beverage_1 = require("./coffees/Beverage");
var Espresso_1 = require("./coffees/Espresso");
var HouseBlend_1 = require("./coffees/HouseBlend");
var Mocha_1 = require("./condiments/Mocha");
var Soy_1 = require("./condiments/Soy");
var SteamedMilk_1 = require("./condiments/SteamedMilk");
var Whip_1 = require("./condiments/Whip");
function printOrder(beverage) {
    console.log("".concat(beverage.getDescription(), ", size ").concat(beverage.getSize(), ", costs $").concat(beverage.cost()));
}
var espresso = new Espresso_1.Espresso();
printOrder(espresso);
var houseBlend = new HouseBlend_1.HouseBlend();
printOrder(houseBlend);
var mocha = new Mocha_1.Mocha(houseBlend);
printOrder(mocha);
var houseBlendWithSteamedMilk = new SteamedMilk_1.SteamedMilk(houseBlend);
printOrder(houseBlendWithSteamedMilk);
var mochaWithWhip = new Whip_1.Whip(mocha);
printOrder(mochaWithWhip);
var coffeeWithSoy = new Soy_1.Soy(espresso);
printOrder(coffeeWithSoy);
var ventiEspresso = new Espresso_1.Espresso();
ventiEspresso.setSize(Beverage_1.Size.Venti);
var ventiCoffeeWithSoy = new Soy_1.Soy(ventiEspresso);
printOrder(ventiCoffeeWithSoy);
