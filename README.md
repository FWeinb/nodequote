nodequote
=========

A basic [quote.fm API](http://quote.fm/labs "quote.fm API") wrapper with a simple interface. 

## Usage ##
```
var nodeQuote = require("./nodequote.js");

nodeQuote.getUser("fweinb", function(j, e){
	if (!e){
		console.log(j);
	}
});
```

