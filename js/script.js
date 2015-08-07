var apikeyAngus = "PV9NAG2OVN1SOTSIA";
var apikeyMiguel= "IIDEXTACNIDGJQBQQ";
var apikeyYTMiguel = "AIzaSyBXuGqEKXsnK_sUmyJUB7qe7A6DHCIWGHM";
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
                // console.log(app.newGenreList);
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

//this function is to check the genre for the A&C artists
//function to search through list of genres, and their corresponding artists
//accepts dot notation, with the final list of artists being contained in arrays for acccess/ randomization
// accepts the FF arguments: "genre" which is a string.
app.genreMatcher = function(genre){
    // array of artists by genre 

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
                var tempname = "";
                if(artistsByGenre[prop].length >= 3){
	            tempName = artistsByGenre[prop];
	            console.log(tempName);
                    app.artistThrower(tempName, 3);
	            // this part of the function can output an array for further processing.
	            // placeholder for next function
	            // app.artistThrower(tempName);
                } else {
                    var tempNameinit = artistsByGenre[prop];
                    var count = artistsByGenre[prop].length;
                    console.log(count);
                    console.log(tempNameinit);
                    for (var i = artistsByGenre[prop].length; i < 3; i++){
                        for (var k = 0; k < app.newGenreList.length; k++){
                            console.log(artistsByGenre[app.newGenreList[k]])
                            var splicer = artistsByGenre[app.newGenreList[k]]
                            tempName = tempNameinit.concat(splicer);
                            if (tempName.length >= 3){
                                console.log(tempName);
                                break;
                            }
                           
                        }
                    }

                }
                	console.log(tempName,count);
                	app.artistThrower(tempName,count);
                
	    	} 

        }
    } else {
        var tempName = [];
        console.log(1);
        for (var k = 0; k < app.newGenreList.length; k++){
            console.log(artistsByGenre[app.newGenreList[k]])
            var splicer = artistsByGenre[app.newGenreList[k]]
            tempName = tempName.concat(splicer);
            if (tempName.length >= 3){
                console.log(tempName);
                break;
            }
        }
        if (tempName.length < 3){
            
        }
            
        app.artistThrower(tempName,0);
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
	    	genreList.splice(num, 1)
	    	app.artistsArray.push(name);
        }
        console.log(app.artistsArray);
        
    } else {
	app.artistsArray = genreList;
	console.log(app.artistsArray)
        // for (var k = app.artistsArray.length; k < 4; k++){
        //     for(var i = 0; i < newGenreList.length; i++){
                
        //     }

        // }
    };                          

}


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

// THIS IS THE VIDEO RENDERING AND HTML WRITING BLOCK

app.videoFinder = function(artistName){// accepts an artist array (probably hopefully? limited to three)
	// ajax call is made to find video ids of the artists
	// throws video id
	// ID is moved to additional constructor for video URL in youtube

	    $.ajax({
		url: "https://www.googleapis.com/youtube/v3/search?",
		type: "GET",
		dataType: 'json',
		data:{
		    key:apikeyYTMiguel,
		    format:"json",
		    part:"snippet",
		    q: artistName,
		    type: "video"
		},
		success: function(results){
		    //pass video ID here
		    // returns YT's top hit 
		    app.videoRenderer(results.items[0].id.videoId);
		} 


	    }); //ajax to search for inputed artist's genre.

};



app.videoRenderer = function (videoID){// accepts video ID and flag for where it goes to display?
	var videoURL = ("http://www.youtube.com/embed/"+videoID+"?autoplay=0&origin=http://example.com");
  	console.log(videoURL); // verifies integrity of video URL defaults to NOT autoplay.
	$(".artist-lists.first-list.video").empty();  	
	// maybe can use if statement here to create variable that selects which selector to use?

	var firstVideo 	= ".artist-lists .first-list .video";
	var secondVideo	= ".artist-lists .second-list .video";
	var thirdVideo	= ".artist-lists .third-list .video";

  		
  		// JQuery object to create iframe scaffold
  		var $videoItem = $("<iframe>");
  		// begin construction of iframe elements
  		$videoItem.attr("id", "ytplayer");
  		$videoItem.attr("type", "text\/html");
  		$videoItem.attr("width","300"); // change width here
		$videoItem.attr("height","230"); // change height here
		$videoItem.attr("src", videoURL); // complete video URL is here
		$videoItem.attr("frameborder","0"); // so as not to mess with the CSS
		// end construction of iframe elements;

		// select the selector for video and append.
		
		$(secondVideo).append($videoItem);

  	// }); //end of each function

	// begins concatenation process to create HTML string for iframe
	// is fired when results are generated (so after user selects the genre)
	console.log("exiting video Renderer function");
};

//END VIDEO CREATION

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



