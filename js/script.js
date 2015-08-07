var apikeyAngus = "PV9NAG2OVN1SOTSIA";
var apikeyMiguel= "IIDEXTACNIDGJQBQQ";
var genreURL = "http://developer.echonest.com/api/v4/genre/similar";

var app = {};

app.scrollD = function() {

	$(".start").on("click",function(){
				$('html, body').animate({
			    scrollTop: $(".search_artist").offset().top
			}, 2000);
		});
}

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
	    bucket: "genre",
	},
	success: function(artist){
	    // console.log(artist.response.artists[0].genres);
	    app.genreRadioButtons(artist.response.artists[0].genres);
	} //end of success function


    }); //ajax to search for inputed artist's genre.

} //app.getGenre funcion end here


// pull for similar Genres, outputs array in order of similarity
// i.e.
app.newGenreList = [];
app.SimGenre = function (genre){
    var simGenCall = $.ajax({
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
            app.newGenreList = [];
            for (var i=0; i<a.length; i++){
                app.newGenreList.push(a[i].name);
                
                // console.log (a[i].name);
            };
            console.log(app.newGenreList);
            app.genreMatcher(genre);
        },
        fail: function (){
            console.log("fail");
        }
    });
}

//function to return a radio button list of genre based on user's artist search


// function to create radiobuttons with labels
app.genreRadioButtons = function(genreList){
	$(".search_radioButtons").empty();
	$.each(genreList, function(index,item){
		console.log(item.name);
		// JQuery object to create radio buttons
		var $radioItem = $("<input>");

		$radioItem.attr("name", "artistRadioButtons");
		$radioItem.attr("type", "radio");
		$radioItem.attr("id", item.name + " radioButton");
		$radioItem.attr("value", item.name);
		// JQuery object to create radio button LABELS
		var $labelItem = $("<label>");
		$labelItem.addClass("artistLabel");
		$labelItem.attr("for", item.name + " radioButton");
		$labelItem.attr("value", item.name);
		$labelItem.text(item.name);
		// final construction of HTML scaffold
		// $labelItem.append($radioItem);   commented out by Ivy
		// print scaffold to matching div
		$(".search_radioButtons").append($radioItem,$labelItem); //added $radioItem before lable by Ivy

	}); //end of each function

};

//


//function to store the value from the drop down list selection

app.genreSelected = function(){

	$(".search_radioButtons").on("change", function(e){
		app.genreListA = "";
		e.preventDefault();
		app.genreListA = $("input[name='artistRadioButtons']:checked").val();
		// console.log(app.searchQuery);
            
            app.SimGenre(app.genreListA);

	//calling.genreMatcher here
	    // app.genreMatcher(app.genreListA);

    });
} // end of app.genreSelected


app.arraytoObjects = function (array,addObject){
    
    for (var o = 0; o < array.length; o++){
        var object = {
            name: array[o],
            genre: addObject
        };
        array.splice(o,1,object);
    }
    
}

//this function is to check the genre for the A&C artists
//function to search through list of genres, and their corresponding artists
//accepts dot notation, with the final list of artists being contained in arrays for acccess/ randomization
// accepts the FF arguments: "genre" which is a string.
app.genreMatcher = function(genre){
    // array of artists by genre 
    // regex to strip whitespaces from genre
    var foundGenre = genre;

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
	    "Royksopp"
	],
	"shiver pop":["absolutely free",	"win win",	"zulu winter"],
	"indie":["Amy Millan",	"bishop Morocco",	"Bloc Party",	"broken social scene",	"Dan Mangan",	"deer tick",	"Feist",	"Hayden",	"Years",	"zulu winter",	"still life still",	"Los Campesinos!",	"Memphis",	"the cribs"],
	"canadian indie":["Amy Millan",	"Jason Collett",	"kevin drew",	"Los Campesinos!"	],
	lilith:	["Amy Millan"],
	"indie fuzzpop":	["bishop Morocco",	"bishop Morocco"],
	rock:	["Feist",	"Bell Orchestre",	"Bloc Party",	"the cribs"],
	"post rock": ["Bell Orchestre"],
	jazz:	["BADBADNOTGOOD"],
	"dark jazz":	["BADBADNOTGOOD"],
	alternative:	["BADBADNOTGOOD",	"deer tick",	"Sally Seltman"],
	"hip hop":	["BADBADNOTGOOD",	"zeus"],
	"bubblegum pop":	["andy kim"],
	lofi:	["broken social scene",	"Feist",	"Hayden",	"kevin drew"],
	"chamber pop":	["broken social scene", "Hayden"],
	"noise pop":	["broken social scene",	"Torres",	"The Drums",	"Los Campesinos!",	"no joy"],
	"neo psychedelic":	["broken social scene"],
	"nu gaze":	["broken social scene",	"The Drums"],
	"indie folk":	["broken social scene", "Hayden"],
	"slow core":	["broken social scene",	"Feist",	"Hayden"],
	"freak folk":	["broken social scene",	"deer tick",	"Timber Timbre"],
	indietronica:	["broken social scene",	"The Drums",	"ra ra riot"],
	latin:	["Chikita Violenta",	"rey pila"],
	electronica:	["Chikita Violenta",	"moby"],
	mexican:	["Chikita Violenta",	"rey pila"],
	canadian:	["Chikita Violenta",	"Dan Mangan",	"still life still"],
	folk:	["Dan Mangan",	"deer tick"],
	"folk christmas":	["deer tick",	"Feist"],
	"indie pop":	["Feist",	"kevin drew",	"ra ra riot"],
	garage:	["Gold & Youth"],
	"speed garage":	["Gold & Youth"],
	metal:	["Fucked Up"],
	punk:	["Fucked Up",	"The Drums"],
	hardcore:	["Fucked Up"],
	"post hardcore":	["Fucked Up"],
	"electronic":	["Tricky",	"Röyksopp"],
	"chill":	["Tricky",	"The Drums",	"Röyksopp"],
	"trip hop":	["Tricky"],
	"grave wave":	["Trust"],
	"polish":	["zeus"],
	"shimmer pop":	["zulu winter"],
	"dance punk":	["The Drums",	"Röyksopp"],
	"dance":	["The Drums"],
	"indie rock":	["Los Campesinos!"],
	ensemble:	["lowell"],
	"wind ensemble":	["lowell"],
	"big beat":	["moby"],
	piano:	["ra ra riot"],
	australian:	["Sally Seltman"],
	"brit pop":	["the cribs"]
    };
    app.randomNoGenre(artistsByGenre.noGenre)
    console.log(Object.keys(artistsByGenre));
    if (artistsByGenre.hasOwnProperty(foundGenre)){
        for (var prop in artistsByGenre){
	    if(prop === foundGenre){
                var tempName = [];
                if(artistsByGenre[prop].length >= 3){
	            tempName = artistsByGenre[prop];
	            console.log(tempName);
                    // array to object conversion
                    app.arraytoObjects (tempName,foundGenre);
                    console.log(tempName);
	            // this part of the function can output an array for further processing.
	            // placeholder for next function
	            // app.artistThrower(tempName);
                    
                    app.artistThrower(tempName, 3);
                } else {
                    var tempNameinit = artistsByGenre[prop];
                    var count = artistsByGenre[prop].length;
                    console.log(count);
                    app.arraytoObjects(tempNameinit,foundGenre); //array to object
                    
                    console.log(tempNameinit);
                    for (var i = artistsByGenre[prop].length; i < 3; i++){
                        for (var k = 0; k < app.newGenreList.length; k++){
                            if(artistsByGenre.hasOwnProperty(app.newGenreList[k])){
                                console.log(artistsByGenre[app.newGenreList[k]])
                                var splicer = artistsByGenre[app.newGenreList[k]]
                                app.arraytoObjects(splicer,app.newGenreList[k]);
                                tempName = tempNameinit.concat(splicer);
                            }
                            if (tempName.length >= 3){
                                console.log(tempName);
                                break;
                            }
                            
                        }
                    }
                    console.log(tempName,count);
                    app.artistThrower(tempName,count);
                }
            }            
        }
    } else {
        var tempName = [];
        var count = "";
        console.log(1);
        for (var k = 0; k < app.newGenreList.length; k++){
            if(artistsByGenre.hasOwnProperty(app.newGenreList[k])){
                console.log(artistsByGenre[app.newGenreList[k]])
                var splicer = artistsByGenre[app.newGenreList[k]]
                app.arraytoObjects(splicer,app.newGenreList[k]);
                tempName = tempName.concat(splicer);
            }
            if (tempName.length >= 3){
                console.log(tempName);
                count = tempName.length;
                break;
            }
        
        }
        if (tempName.length < 3){
            console.log("fill");
            count = tempName.length;
            for (var j = 0; j < artistsByGenre.noGenre.length; j++){
                var noGenreBand = [];
                noGenreBand.push(artistsByGenre.noGenre[j])
                app.arraytoObjects(noGenreBand,"noGenre");
                tempName = tempName.concat(noGenreBand);
                
            }

        }            
        app.artistThrower(tempName,count);
    }
};	


app.artistThrower = function (genreList, counter){// accepts an array and checks if it has more than three artists. returns three artists. (at random)
    app.artistsArray = [];
    
    if(genreList.length >= 3 && counter >= 3){
	console.log("artists are more than three");
	for (var i = 0; i < 3; i++){
	    var num = (Math.floor(Math.random() * genreList.length))
	    var name = genreList[num];
	    app.artistsArray.push(name);
            genreList.splice(num, 1);
	    console.log(app.artistsArray);	
	    
	    console.log("returning three random artists!");
        }
	
	// return names anyway
    } else if (genreList.length >= 3 && counter < 3){
        for (var i = 0; i < counter; i++){
            app.artistsArray.push(genreList[0]);
            genreList.shift();
            console.log(genreList.length);
        };
        for (var k = app.artistsArray.length; i < 3; i++){
            var num = (Math.floor(Math.random() * genreList.length))
	    var name = genreList[num];
	    app.artistsArray.push(name)
            genreList.splice(num,1);
        }
        console.log(app.artistsArray);
        
    } else {
	app.artistsArray = genreList;

	console.log(app.artistsArray)

    }; 
    app.finalDetail(app.artistsArray);                         
                         

}

// get 3 artists on the page

app.finalDetail = function (artist){
	console.log(artist);
	var finalArray = [];
	$.each(artist, function(index,item){
			var Aname = item.name;
			var Agenre = item.genre;
			console.log(Aname);
		    $.ajaxSettings.traditional = true; //PLEASE DONT TOUCH!!!
		    // var bucket = "biographies&bucket=image&bucket=reviews&bucket=audio&bucket=video&bucket=discovery"
		    $.ajax({
			url: "http://developer.echonest.com/api/v4/artist/search?",
			type: "GET",
			dataType: 'json',
			data:{
			    api_key:apikeyAngus,
			    format:"json",
			    name:Aname,
			    bucket: ["images", "biographies", "songs"],
			    results:1
			},
			success: function(final){
			    console.log(final.response.artists[0]);
			finalArray.push(final.response.artists[0]);
			console.log(finalArray);
		 app.finalDisplay (finalArray);
			} //end of success function


	});
});

};

//final display is happened
app.finalDisplay = function(finalD){
	$.each(finalD, function(index,item){
			console.log(item);

	});

};

// app.artistsArray = genreList;
// console.log("artists are less than three")


//randomNoGenre function

app.randomNoGenre = function (list){
    var randomN = Math.floor(Math.random()*list.length);
    var randomArtist = list[randomN];
    $.ajaxSettings.traditional = true; //PLEASE DONT TOUCH!!!
    // var bucket = "biographies&bucket=image&bucket=reviews&bucket=audio&bucket=video&bucket=discovery"
    $.ajax({
	url: "http://developer.echonest.com/api/v4/artist/search?",
	type: "GET",
	dataType: 'json',
	data:{
	    api_key:apikeyAngus,
	    format:"json",
	    name:randomArtist,
	    bucket: ["images", "biographies", "songs"]
	},
	success: function(artist){
	    console.log(artist);
	    
	} //end of success function


    });

}

app.init = function(){
    app.searchArtist();
    app.genreSelected();
    app.scrollD();

    // app.randomNoGenre();
    // app.genreMatcher();
};

$(document).ready(function(){

    app.init();
});



