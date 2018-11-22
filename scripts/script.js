
$(function () {
	bubbleApp.init()
});

// Create app namespace to hold all methods
const bubbleApp = {};
bubbleApp.apiKey = 'ca6458eda70bc2879ed3d6c923ba72a4';
bubbleApp.url = 'https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=0&count=20&cuisines=247';
// bubbleApp.url2 = 'https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=21&count=40&cuisines=247';
// bubbleApp.url3 = 'https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=41&count=60&cuisines=247';
// bubbleApp.url4 = 'https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=61&count=80&cuisines=247';
// bubbleApp.url5 = 'https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=81&count=100&cuisines=247';
bubbleApp.bbtList = [];

// Collect input
bubbleApp.getInfo = function () {
	$.ajax({
		url: `${bubbleApp.url}cuisines`,
		headers: {
			'user-key': 'ca6458eda70bc2879ed3d6c923ba72a4'
		},
		dataType: 'json',
		method: 'GET',
		data: {
			city_id: 89,
			cuisines: 247,
		}
	}).then((res) => {
		// // console.log(res);
		bubbleApp.allPlaces = res.restaurants;
		// console.log(bubbleApp.allPlaces)
		bubbleApp.displayNewList(bubbleApp.allPlaces)
	});

}



bubbleApp.displayNewList = function (oldList) {
	oldList.forEach((place) => {
		const resObject = {};
		resObject.name = place.restaurant.name;
		resObject.locality = place.restaurant.location.locality;
		resObject.locality = place.restaurant.location.locality.split(', ');
		resObject.address = place.restaurant.location.address;
		resObject.cuisine = place.restaurant.cuisines;
		bubbleApp.bbtList.push(resObject);
	});
//	console.log(bubbleApp.bbtList)
	// console.log((bubbleApp.bbtList).length)
}


bubbleApp.getPlace = function(userChoice) {
	//console.log('boop')
	for (i = 0; i < (bubbleApp.bbtList).length; i++) {
//		console.log(bubbleApp.bbtList[i].name);
//		console.log(bubbleApp.bbtList[i].locality.length);
		for (a = 0; a < bubbleApp.bbtList[i].locality.length; a++) {
//			console.log(bubbleApp.bbtList[i].locality[a])
			if (bubbleApp.bbtList[i].locality[a] == userChoice) {
//				console.log(bubbleApp.bbtList[i])
				console.log(bubbleApp.bbtList[i].name)
			}
		}
	};

}




// Display data on the page

// Start app
bubbleApp.init = function () {
	bubbleApp.getInfo();
	bubbleApp.listenForChange();

}


bubbleApp.listenForChange = function () {
	$("select").on('change', function () {
		// ..store the value of the selected option
		const userChoice = $(this).val()
		// console.log(userChoice)
		// pass this animal string to our get art method to fire off the ajax request and get soem idggerence art
		bubbleApp.getPlace(userChoice);
	})

}

