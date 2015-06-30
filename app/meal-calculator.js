var dinerNumber = (function ask() {
	var n = prompt("How many diners? Put in a number between 2-4.");
	return isNaN(n) || n<2 || n>4 ? ask() : n;
})();

var diners = [];

for (var i=0; i<dinerNumber; i++) {
	diners[i] = {};
	var eat = true;
	while (eat) {
		var meal = prompt("Add meal item for diner " + (i+1));
		diners[i][meal] = (function ask() {
			var n = prompt("How much is this item? (must be a number)");
			return isNaN(n) ? ask() : n;
		})();
		eat = confirm("Add another meal item for diner " + (i+1) + "?");
	}
}

var preTotal = 0;
var taxPercent = 1.1;
var tipPercent = 1.2;

for (var j=0; j<diners.length; j++) {
	for (item in diners[j]) {
		var num = Number(diners[j][item]);
		preTotal += num;
	}
}

var afterTax = preTotal * taxPercent;
var tip = (tipPercent - 1) * afterTax;
var tipPerDiner = tip / dinerNumber;

var total = afterTax * tipPercent;

for (var k=0; k<diners.length; k++) {
	var subTotal = 0;
	for (item in diners[k]) {
		var num = Number(diners[k][item])
		subTotal += num;
	}
	diners[k].tip = tipPerDiner;
	diners[k].ownTax = subTotal * (taxPercent - 1);
}

console.log(diners);
document.write("Total is $" + total +".\n");
for (var diner=0; diner<diners.length; diner++) {
	var element = document.createElement("br");
	document.body.appendChild(element);
	var mealAmt = diners[diner].ownTax / (taxPercent  - 1);
	document.write("Diner " + (diner + 1) + "'s meal cost $" + mealAmt + 
		" plus $" + diners[diner].ownTax + " tax plus $" + diners[diner].tip +
		" tip for a total of $" + 
		(mealAmt+diners[diner].ownTax+diners[diner].tip) + ".\n");
}