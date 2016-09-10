// Initial array of movies
	var movies = [];

	// ========================================================

	// displayMovieInfo function now re-renders the HTML to display the appropriate content. 
	function displayMovieInfo(){

		var movie = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
		
		// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {           
           console.log(response);

           var results = response.data;

           //Loop through results data and create gifs
			
			for (var i = 0; i < results.length; i++) {
				//giv holder div
                    var giphyDiv = $("<div>");
                    giphyDiv.addClass("col-md-4")
                    //Rating para
                    var p = $("<p>").text("Rating :" + results[i].rating);
                    //Create image tag
                    var giphyImage = $("<img>");
                    giphyImage.addClass("img-responsive gif");
                    //set src attribute to still image
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    //set data-still and data-animate and data-state attributes
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                    giphyImage.attr("data-state", "still");

                    giphyDiv.append(p);
                    giphyDiv.append(giphyImage);
                    $("#moviesView").prepend(giphyDiv);  
                }
		});

	}

	// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies
		$('#buttonsView').empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++){

			// Then dynamicaly generates buttons for each movie in the array
		    var a = $('<button>') 
		    a.addClass('btn btn-default movie'); // Added a class 
		    a.attr('data-name', movies[i]); // Added a data-attribute
		    a.text(movies[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addMovie').on('click', function(){

		// This line of code will grab the input from the textbox
		var movie = $('#movie-input').val().trim();

		if(!movie){
			alert("Please Enter Movie Name");
		}else{
			// The movie from the textbox is then added to our array
			movies.push(movie);
			// Our array then runs which handles the processing of our movie array
			renderButtons();
		}
		return false;
	});

	// ========================================================

	// This function handles events where one gif image is clicked

	$(document).on('click', '.gif', function(){

		    console.log("Inside gifClick" + $(this).attr('data-state'));
            var state = $(this).attr('data-state');
            if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            
        });
	// ========================================================

	// Generic function for displaying the movieInfo
	$(document).on('click', '.movie', displayMovieInfo);


	// ========================================================

	// This calls the renderButtons() function
	renderButtons();
