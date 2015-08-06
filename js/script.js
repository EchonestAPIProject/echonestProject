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

	});

} // end of app.genreSelected


//this function is to check the genre for the A&C artists
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
		shiver pop:[
		"absolutely free",	"win win",	"zulu winter"
		],
		indie:[
		"Amy Millan",	"bishop Morocco",	"Bloc Party",	"broken social scene",	"Dan Mangan",	"deer tick",	"Feist",	"Hayden",	"Years",	"zulu winter",	"still life still",	"",	"Los Campesinos!",	"Memphis",	"the cribs"
		],
		canadian indie:[
		"Amy Millan",	"Jason Collett",	"kevin drew",	"Los Campesinos!"	
		],
		lilith	"Amy Millan",
		indie fuzzpop	"bishop Morocco",	"bishop Morocco",
		rock	"Feist",	"Bell Orchestre",	"Bloc Party",	"the cribs",
		post rock "Bell Orchestre",
		jazz	"BADBADNOTGOOD",
		dark jazz	"BADBADNOTGOOD",
		alternative	"BADBADNOTGOOD",	"deer tick",	"Sally Seltman",
		hip-hop	"BADBADNOTGOOD",	"zeus",
		bubblegum pop	"andy kim",
		lo-fi	"broken social scene",	"Feist",	"Hayden",	"kevin drew",
		chamber pop	"broken social scene", "Hayden",
		noise pop	"broken social scene",	"Torres",	"The Drums",	"Los Campesinos!",	"no joy",
		neo-psychedelic	"broken social scene",
		nu gaze	"broken social scene",	"The Drums",
		indie folk	"broken social scene", "Hayden",
		slow core	"broken social scene",	"Feist",	"Hayden",
		freak folk	"broken social scene",	"deer tick",	"Timber Timbre",
		indietronica	"broken social scene",	"The Drums",	"ra ra riot",
		latin	"Chikita Violenta",	"rey pila",
		electronica	"Chikita Violenta",	"moby",
		mexican	"Chikita Violenta",	"rey pila",
		canadian	"Chikita Violenta",	"Dan Mangan",	"still life still",
		folk	"Dan Mangan",	"deer tick",
		folk christmas	"deer tick",	"Feist",
		folk christmas	"deer tick",	"Feist",	
		indie pop	"Feist",	"kevin drew",	"ra ra riot",
		garage	"Gold & Youth",
		speed garage	"Gold & Youth",
		metal	"Fucked Up",
		punk	"Fucked Up",	"The Drums",
		hardcore	"Fucked Up",
		post-hardcore	"Fucked Up",
		electronic	"Tricky",	"Röyksopp",
		chill	"Tricky",	"The Drums",	"Röyksopp",
		trip hop	"Tricky",
		grave wave	"Trust",
		polish	"zeus",
		shimmer pop	"zulu winter",
		dance-punk	"The Drums",	"Röyksopp",
		dance	"The Drums",
		indie rock	"Los Campesinos!",
		ensemble	"lowell",
		wind ensemble	"lowell",
		big beat	"moby",
		piano	"ra ra riot",
		australian	"Sally Seltman",
		britpop	"the cribs",
	};
	
	
	console.log(Object.keys(artistsByGenre));
	for (var prop in artistsByGenre){
		if(prop === "noGenre"){
			console.log("yes!")
		} console.log("no");
	}
};



app.init = function(){

};

$(document).ready(function(){
  app.init();
});


 
