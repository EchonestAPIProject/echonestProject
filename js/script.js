var app = {};

//search artist field functions

app.searchArtist = function(){
	$(".search_form").on("submit", function(e){
		e.preventDefault();
		app.searchQuery = $(".search_field").val();
		

	}); // search_form click fuction end here

} //app.searchArtist end here

//get input artist's genre funtion
app.getGenre = function(query){
	$.ajax({
		url: "http://developer.echonest.com/api/v4/artist/search?",
		type: "GET",
		dataType: 'json',
		data:{
			api_key:"SXHLRA1KMZ5DUSO1Q",
			format:"json",
			name:query,
			bucket: "genre"
		},
		success: function(artist){
			console.log(artist.response.artists[0].genres);
			app.genreDropdown(artist.response.artists[0].genres);
			app.genreSelected();

		} //end of success function


	}); //ajax to search for inputed artist's genre.
} //app.getGenre funcion end here 



//function to return a drop down list of genre based on user's artist search
app.genreDropdown = function(genreList){
	$.each(genreList, function(index,item){
		console.log(item.name);
		var $listItem = $("<option>");
		$listItem.text(item.name);
		$listItem.attr("value", item.name);
		$(".search_dropdown").append($listItem);

	}); //end of each function
	app.getGenre(app.searchQuery);
} // app.henreDropdown end here.

//function to store the value from the drop down list selection

app.genreSelected = function(){
	$(".search_dropdown").on("change", function(e){
		e.preventDefault();
		app.searchQuery = $(this).val();
		console.log(app.searchQuery);

	});

} // end of app.genreSelected


//this function is to check the genre for the A&C artists
app.clientArtist = function(){

} //app.clientArtist function ends here

app.init = function(){
	app.searchArtist();
	app.getGenre();
	app.genreDropdown();
	// app.genreSelected();
};

$(document).ready(function(){
  app.init();
});


 
