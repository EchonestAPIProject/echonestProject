var app = {};

//search field functions

app.searchArtist = function(){
	$(".search_form").on("submit", function(e){
		e.preventDefault();
		app.searchQuery = $(".search_field").val();
		app.getGenre(app.searchQuery);

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
		} //end of success function

	}); //ajax to search for inputed artist's genre.
} //app.getGenre funcion end here 

//this function is to check the genre for the A&C artists
app.clientArtist = function(){
	var allArtists = ["Absolutely Free","Amy Millan","Andy Kim","BADBADNOTGOOD","Bell Orchestre",
		"Bishop Morocco","Black English","Bloc Party","Broken Social Scene","Calvin Love",
		"Charles Spearin","Chikita Violenta","Chilly Gonzales","Cold Specks","Dan Mangan + Blacksmith",
		"Deer Tick","Eight and a Half","Farao","Feist","Fucked Up","Gold and Youth",
		"Gord Downie, The Sadies, And The Conquering Sun","Hayden","In The Valley Below",
		"Jason Collett","Kevin Drew","Los Campesinos!","Lowell","Memphis","Mia Maestro",
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
	// array of artists by genre here
	var foundGenre = genre;
	for (var prop in artistsByGenre){
		if(artistsByGenre.hasOwnProperty(prop)){
			if(x[prop]===foundGenre){
				console.log("found it!");
			}
		}
	}
};

app.init = function(){
	app.searchArtist();
	app.getGenre();

};

$(document).ready(function(){
  app.init();
});


 
