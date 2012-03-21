var nodeQuote = require("./nodequote.js");

/* Recommandation */
	nodeQuote.getRecommendation(900, function(j, e){
		if (!e){
			console.log("getRecomendation:\t" + j.user.fullname);
		}
	});

	nodeQuote.getRecommendationListByArticle(123, 0, function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getRecommendationListByArticle:\t" + j.article.url);
		}
	});

	nodeQuote.getRecommendationListByUser("uarrr", 0, function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getRecommendationListByUser:\t" + j.user.fullname);
		}
	});


/* Article */
	nodeQuote.getArticle(2111, function(j, e){
		if (!e){
			console.log("getArticle(id):\t" + j.topquote.user_id);
		}
	});

	nodeQuote.getArticle("http://www.spiegel.de/kultur/literatur/0,1518,790592-2,00.html", function(j, e){
		if (!e){
			console.log("getArticle(url):\t" + j.topquote.user_id);
		}
	});

	nodeQuote.getArticleListByPage(23, 0, function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getArticleListByPage:\t" + j.page.name);
		}
	});

	nodeQuote.getArticleListByCategories({ids : [1,2,3], language : "de", page : [5,6]}, function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getArticleListByCategories:\t" + j.totalCount);
		}
	});

/* Page */
	nodeQuote.getPage(24,  function(j, e){ 
		if (!e){
			console.log("getPage(id):\t" + j.name);
		}
	});

	nodeQuote.getPage("zeit.de",  function(j, e){ 
		if (!e){
			console.log("getPage(domain):\t" + j.id);
		}
	});

	nodeQuote.getPageList(0, function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getPageList:\t" + j.totalCount);
		}
	});

/* User */
	nodeQuote.getUser(1229,  function(j, e){ 
		if (!e){
			console.log("getUser(id):\t" + j.username);
		}
	});

	nodeQuote.getUser("FWeinb",  function(j, e){ 
		if (!e){
			console.log("getUser(name):\t" + j.id);
		}
	});

	nodeQuote.getUserListFollowers("FWeinb", 0,  function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getUserListFollowers:\t" + j.totalCount);
		}
	});

	nodeQuote.getUserListFollowings("FWeinb", function(j, e){ // You can omit the 0 for page
		if (!e){
			console.log("getUserListFollowings:\t" + j.totalCount);
		}
	});

/* Category */
	nodeQuote.getCategoryList(function(j, e){ 
		if (!e){
			console.log("getCategoryList:\t" + j.totalCount);
		}
	});

