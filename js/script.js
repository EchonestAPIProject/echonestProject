var apikeyAngus = "PV9NAG2OVN1SOTSIA";
var genreURL = "http://developer.echonest.com/api/v4/genre/similar";

var app = {};

//search artist field functions

app.searchArtist = function(){
	$(".search_form").on("submit", function(e){
		e.preventDefault();
		app.searchQuery = $(".search_field").val();
	    app.getGenre(app.searchQuery);
        app.SimGenre(app.searchQuery);


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
			console.log(artist.response.artists[0].genres);
			app.genreDropdown(artist.response.artists[0].genres);
			app.genreSelected();

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

	var allArtists = ["Absolutely Free","Amy Millan","Andy Kim","BADBADNOTGOOD","Bell Orchestre",
		"Bishop Morocco","Black English","Bloc Party","Broken Social Scene","Calvin Love",
		"Charles Spearin","Chikita Violenta","Chilly Gonzales","Cold Specks","Dan Mangan + Blacksmith",
		"Deer Tick","Eight and a Half","Farao","Feist","Fucked Up","Gold and Youth",
		"Moby","No Joy","Ra Ra Riot","Reuben And The Dark","Rey Pila","Royksopp",
		"Royksopp and Robyn","Sally Seltmann","Snowblink","Still Life Still",
		"Tei Shi","The Cribs","The Darcys","The Drums","Timber Timbre","Tobias Jesso Jr",
		"Torres","Tricky","TR/ST","WIN WIN","Years","Zeus","Zulu Winter"
	]; //end of array of the list of artists name
}; //app.clientArtist function ends here

//function to search through list of genres, and their corresponding artists
//accepts dot notation, with the final list of artists being contained in arrays for acccess/ randomization
// accepts the FF arguments: "genre" which is a string.
app.genreFinder = function(genre){
	// array of artists by genre 
	var foundGenre = "noGenre";
	var artistsByGenre = {
		noGenre: [
		"absolutely free",	
		"Bell Orchestre",	
		"andy kim",	
		"Absolutely free",	
		"cold specks",	
		"Torres",	
		"Feist",	
		"The Drums",	
		"tei shi",	
		"kevin drew",	
		"Röyksopp"
		],
		test1:[
		]
	};
	
	
	console.log(Object.keys(artistsByGenre));
	for (var prop in artistsByGenre){
		if(prop === "noGenre"){
			console.log("yes!")
		} console.log("no");
	}
};



app.init = function(){
	// app.searchArtist();
	// app.getGenre();
	// app.genreDropdown();
	app.genreFinder()
};

$(document).ready(function(){
  app.init();
});


 
