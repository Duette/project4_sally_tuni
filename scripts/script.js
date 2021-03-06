
$(function () {
	bubbleApp.init()

	$(".carousel").flickity({
		freeScroll: true,
		wrapAround: true,
		accessibility: true,
		resize: true
	});

});


// Create app namespace to hold all methods
const bubbleApp = {};
bubbleApp.apiKey = 'ca6458eda70bc2879ed3d6c923ba72a4';

// Store all urls for AJAX calls to API
bubbleApp.NorthYork = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87881&entity_type=subzone&cuisines=247", //NorthYork
	"https://developers.zomato.com/api/v2.1/search?entity_id=87881&entity_type=subzone&start=20&cuisines=247" // NorthYork pt2
]};
bubbleApp.DowntownYonge = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87091&entity_type=subzone&cuisines=247", // Downtown Yonge
		"https://developers.zomato.com/api/v2.1/search?entity_id=87091&entity_type=subzone&start=20&cuisines=247" // Downtown Yonge pt2
	]};

bubbleApp.YongeStreet = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=4061&entity_type=landmark&cuisines=247",
	"https://developers.zomato.com/api/v2.1/search?entity_id=4061&entity_type=landmark&start=21&cuisines=247"]
};

bubbleApp.Thornhill = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87971&entity_type=subzone&count=4&cuisines=247",
	"https://developers.zomato.com/api/v2.1/search?entity_id=87971&entity_type=subzone&start=4&count=4&cuisines=247"]
};

bubbleApp.HarbordVillage = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87201&entity_type=subzone&cuisines=247",
	"https://developers.zomato.com/api/v2.1/search?entity_id=87201&entity_type=subzone&start=20&cuisines=247"]
}

bubbleApp.KensingtonChinatown = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87221&entity_type=subzone&cuisines=247",
		"https://developers.zomato.com/api/v2.1/search?entity_id=87221&entity_type=subzone&start=21&cuisines=247"]
}

bubbleApp.RichmondHill = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87981&entity_type=subzone&count=5&cuisines=247", 
	"https://developers.zomato.com/api/v2.1/search?entity_id=87981&entity_type=subzone&start=5&cuisines=247"]
}

bubbleApp.DundasStreetWest = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=5111&entity_type=metro&cuisines=247",
		"https://developers.zomato.com/api/v2.1/search?entity_id=5111&entity_type=metro&start=20&cuisines=247"]
}

bubbleApp.BloorWestVillage = {
	url: ["https://developers.zomato.com/api/v2.1/search?entity_id=87301&entity_type=subzone&cuisines=247",
"https://developers.zomato.com/api/v2.1/search?entity_id=87301&entity_type=subzone&start=20&cuisines=247"]
}


bubbleApp.userOptions = [];



// Collect input from API
bubbleApp.getPlace = function (userChoice) {
	bubbleApp.userOptions = [];
	const promiseArray = [];
	
	for (i = 0; i < bubbleApp[userChoice].url.length; i++) {
		// console.log(bubbleApp[userChoice].url[i])
		const promise = $.ajax({
			url: bubbleApp[userChoice].url[i],
			headers: {
				"user-key": "ca6458eda70bc2879ed3d6c923ba72a4"
			},
			dataType: "json",
			method: "GET",
			data: {
				city_id: 89,
				cuisines: 247,
			}
		})
		promiseArray.push(promise)
	}
	// console.log(promiseArray)
	bubbleApp.foundPlaces = [];
	
	$.when(...promiseArray).then(function(...res) {
		res.forEach(function (successObject) {

			bubbleApp.foundPlaces.push(...successObject[0].restaurants)
		})
		// console.log(bubbleApp.foundPlaces)
		bubbleApp.certainInfoOnly(bubbleApp.foundPlaces)

	})

}

// Chooses a random bubble tea location from the list of places in an area
bubbleApp.randomChoice = function (curatedList) {
	let randomLocation = curatedList[Math.floor(Math.random() * curatedList.length)];
	// console.log(randomLocation)
	
	$('.result__place').text(`${randomLocation.name}`)
	$('.result__address').text(`${randomLocation.address}`)
	$('.result__cuisine').text(`Cuisine found here: ${randomLocation.cuisine}`)
};

// Goes through the results of the AJAX calls and makes a new array with the required information, and displays the result of bubbleApp. randomChoice
bubbleApp.certainInfoOnly = function (oldList) {
	oldList.forEach((place) => {
		const resObject = {};
		resObject.name = place.restaurant.name;

		resObject.address = place.restaurant.location.address;
		resObject.cuisine = place.restaurant.cuisines;
		bubbleApp.userOptions.push(resObject);
	});
	// console.log(bubbleApp.userOptions);
	bubbleApp.randomChoice(bubbleApp.userOptions);


	$(".transition").css("display", "block");
	$(".result").css("display", "block");
	$(".footer").css("display", "block");


	$.smoothScroll({
		autoFocus: true,
		speed: 1500,
		scrollTarget: $(".result"),
	});

}




bubbleApp.init = function () {

	bubbleApp.listenForChoice();
	

}

// Listens for the event of user clicking on their choice of area
bubbleApp.listenForChoice = function () {
	
	$(".carousel__cell").on("click", function () {
		// console.log(this.getAttribute('value'));
		const userChoice = this.getAttribute('value');

		// console.log(userChoice)
		bubbleApp.getPlace(userChoice);
		// console.log(userOptions)

	});

}

// Allows the user to get a new random bubble tea location in the same area
$(".button__newPlace").on("click", function() {
	bubbleApp.randomChoice(bubbleApp.userOptions)
})

// Brings the user back up to choose a new area
$(".button__newArea").on("click", function() {
	$.smoothScroll({
		autoFocus: true,
		scrollTarget: $(".main"),
	});

})
