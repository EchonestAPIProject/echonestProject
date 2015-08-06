var apikeyAngus = "PV9NAG2OVN1SOTSIA";
var genreURL = "http://developer.echonest.com/api/v4/genre/similar";

var app = {};

//search artist field functions

app.searchArtist = function(){
	$(".search_form").on("submit", function(e){
		e.preventDefault();
		app.searchQuery = $(".search_field").val();
	    app.getGenre(app.searchQuery);
        $(".search_field").val("");


	}); // search_form click fuction end here

} //app.searchArtist end here

//get input artist's genre funtion
app.getGenre = function(query){
	$.ajax({
		url: "http://developer.echonest.com/api/v4/artist/search?",
	    type: "GET",
		dataType: 'json',
		data:{
			api_key:apikeyAngus,
			format:"json",
			name:query,
			bucket: "genre"
		},
		success: function(artist){
			// console.log(artist.response.artists[0].genres);
			app.genreDropdown(artist.response.artists[0].genres);
		
		} //end of success function


	}); //ajax to search for inputed artist's genre.
} //app.getGenre funcion end here


// pull for similar Genres, outputs array in order of similarity
// i.e.
var newGenreList = [];
app.SimGenre = function (genre){
    $.ajax({
        url: genreURL,
        type: "GET",
        dataType: "json",
        data:{
            "api_key":apikeyAngus,
            "name":genre,
            "bucket":"description"
        },
        success: function (simgen){
            console.log(simgen.response.genres);
            var a = simgen.response.genres;
            newGenreList = [];
            for (var i=0; i<a.length; i++){
                newGenreList.push(a[i].name);
                
                // console.log (a[i].name);
            };
        },
        fail: function (){
            console.log("fail");
        }
    });
}





//function to return a drop down list of genre based on user's artist search
app.genreDropdown = function(genreList){
	$(".search_dropdown").empty();
	$.each(genreList, function(index,item){
		console.log(item.name);
		var $listItem = $("<option>");
		$listItem.text(item.name);
		$listItem.attr("value", item.name);
		$(".search_dropdown").append($listItem);

	}); //end of each function
	

} // app.henreDropdown end here.

//function to store the value from the drop down list selection

app.genreSelected = function(){

	$(".search_dropdown").on("change", function(e){
		app.genreListA = "";
		e.preventDefault();
		app.genreListA = $(this).val();
		// console.log(app.searchQuery);
	    console.log(app.genreListA);
            app.SimGenre(app.genreListA);

	});

} // end of app.genreSelected


//this function is to check the genre for the A&C artists
app.clientArtist = function(){


} //app.clientArtist function ends here

app.init = function(){
	app.searchArtist();
	app.getGenre();
	app.genreSelected();
};

$(document).ready(function(){
  app.init();
});

 
