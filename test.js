var nodeQuote = require("./nodequote.js");

nodeQuote.getUser("uarrr", function(j, e){
	if (!e){
		console.log(j);
	}
});