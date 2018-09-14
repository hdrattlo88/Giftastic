

	var animalBtns = ["cat","dog","fish","bird","tiger"];

	// Add buttons 
	function renderButtons() {
		$("#add-animal").empty();
		for (i = 0; i < animalBtns.length; i++) {
		//$("#animal-buttons").append("<button data-animal='" + animalBtns[i] + "'>" + animalBtns[i] + "</button>");
		var a = $("<button>");
		a.attr("data-animal",animalBtns[i]);
		a.attr("data-name", animalBtns[i]);
		a.text(animalBtns[i]);
		$("#add-animal").append(a);
		}

	}

	//won't create buttons......
	$("#find-animal").on("click", function () {
		event.preventDefault();
		var animal = $("animal-input").val().trim();
		animalBtn.push(animal);
		renderButtons();
		
		 console.log("button pressed");
	});
renderButtons();

//API

	$("button").on("click", function () {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			animal + "&api_key=LwKymPu6tTBlcwUn5MYzyWBZPPxfbzSR&limit=10&offset=0&rating=G&lang=en"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			var results = response.data;
			$("#animals").empty();
			for (var i = 0; i < results.length; i++) {
				var animalDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var animalImg = $("<img>");

				animalImg.attr("src", results[i].images.original_still.url);
				animalImg.attr("data-still", results[i].images.original_still.url);
				animalImg.attr("data-animate", results[i].images.original.url);
				animalImg.attr("data-state", "animate");
				animalImg.attr("class", "gif");
				animalDiv.append(p);
				animalDiv.prepend(animalImg);
				$("#animal").prepend(animalDiv);
			}
		});
	});
	
//Cannot get click to work....
	$("#animals").on("click", function(){
		var still = $(this).attr("data-state");
		if (still == "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}

		else  {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
