'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

// EXERCICE 1 :
console.log("EXERCICE 1");
deliveries.forEach(function(element) {
	
	//Getting the truckerId :
	var truckerId = element.truckerId;
	
	// Searching for the corresponding trucker :
	var trucker = truckers.find(function(element) {
	  return element.id == truckerId;
	});
	
	// Changing price :
	element.price = trucker.pricePerKm * element.distance + trucker.pricePerVolume * element.volume;
});
console.log(deliveries);


// EXERCICE 2 :
console.log("EXERCICE 2");

deliveries.forEach(function(element) {

	if(element.volume > 25){// decreases by 50% after 25 m3
		element.price = element.price * 0.5;
	} else if(element.volume > 10){// decreases by 30% after 10 m3
		element.price = element.price * 0.7;
	}else if(element.volume > 5){// decreases by 10% after 5 m3
		element.price = element.price * 0.9;
	}

});
console.log(deliveries);


// EXERCICE 3 :
console.log("EXERCICE 3");

var commission_percentage = 0.3;
deliveries.forEach(function(element) {
	
	// Convargo take a 30% commission on the shipping price to cover their costs.
	var commission = element.price * commission_percentage;

	//insurance: half of commission
	element.commission.insurance = commission / 2;
	
	// the Treasury: 1€ by 500km range
	element.commission.treasury = parseInt(element.distance / 500);
	
	//convargo: the rest
	element.commission.convargo = commission - (element.commission.insurance + element.commission.treasury);
});
console.log(deliveries);


// EXERCICE 4 :
console.log("EXERCICE 4");

deliveries.forEach(function(element) {
	// if the shipper subscribed to deductible option :
	if(element.options.deductibleReduction){
		// calculating the additional charge :
		var charge  = element.volume;
		element.commission.convargo = element.commission.convargo + charge;
	} 
});
console.log(deliveries);



// EXERCICE 5 :
console.log("EXERCICE 5");

actors.forEach(function(element) {

	//Getting the deliveryId or rentalId :
	var deliveryId = element.deliveryId;
	var rentalId = element.rentalId;
	
	// Searching for the corresponding delivery :
	var delivery = deliveries.find(function(element) {
	  return element.id == deliveryId || element.id == rentalId;
	});
	console.log(element);
	console.log(delivery);
	
    //the shipper must pay the shipping price and the (optional) deductible reduction
	element.payment.find(function(element) {
	  return element.who == "shipper";
	}).amount = delivery.price + delivery.volume;
	
    //the trucker receives the shipping price minus the commission
	element.payment.find(function(element) {
	  return element.who == "owner";
	}).amount = delivery.price * commission_percentage;
	
    //the insurance receives its part of the commission
	element.payment.find(function(element) {
	  return element.who == "insurance";
	}).amount = delivery.commission.insurance;
	
    //the Treasury receives its part of the tax commission
	element.payment.find(function(element) {
	  return element.who == "treasury";
	}).amount = delivery.commission.treasury;
	
    //convargo receives its part of the commission, plus the deductible reduction
	element.payment.find(function(element) {
	  return element.who == "convargo";
	}).amount = delivery.commission.convargo;

});
console.log(actors);

