/*
	node Quote.fm API Wrapper
*/

var request = require('request');


var nodeQuote = {
	
	VERSION : '0.01',

	BASE : 'https://quote.fm/api/',


	/* Recommandation */

	getRecommendation : function (id, callback){
		this.getRecommendationList(id, 0, "get", callback);
	},

	getRecommendationListByArticle : function (id, page, callback){
		this.getRecommendationList(id, page, "listByArticle", callback);
	},

	getRecommendationListByUser : function (id, page, callback){
		this.getRecommendationList(id, page, "listByUser", callback);
	},


	getRecommendationList : function(id, page, type, callback){
		request(this.BASE + "recommendation/"+type+"/?id=" + id + this.addPage(page), function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},


	/* Article */

	getArticle : function(para, callback){
		if (this.isNumeric(para)){
			this.getArticleById(para, callback);
		}else{
			this.getArticleByUrl(para, callback);
		}
	},

	getArticleByUrl : function(url, callback){
		request(this.BASE + "article/get/?url=" + url, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getArticleById : function(id, callback){
		request(this.BASE + "article/get/?id=" + id, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},


	getArticleListByPage : function(id, page, callback){
		request(this.BASE + "article/listByPage/?id=" + id + this.addPage(page), function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getArticleListByCategories : function(ids, page, language, scope, callback){
		request(this.BASE + "article/listByCategories/?ids=" + convertIdsToString(ids) + this.addPage(page) + "&language="+language + "&scope="+scope, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	/* Page */

	getPage : function(para, callback){
		if (this.isNumeric(para)){
			this.getPageById(para, callback);
		}else{
			this.getPageByUrl(para, callback);
		}
	},

	getPageById : function(id, callback){
		request(this.BASE + "page/get/?id=" + id, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getPageByUrl : function(domain, callback){
		request(this.BASE + "page/get/?domain=" + domain, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getPageList : function(page, callback){
		request(this.BASE + "page/list/" + this.addPage(page, "?"), function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	/* User */

	getUser : function(para, callback){
		if (this.isNumeric(para)){
			this.getUserById(para, callback);
		}else{
			this.getUserByName(para, callback);
		}
	},

	getUserByName : function(name, callback){
		request(this.BASE + "user/get/?username=" + name, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getUserById : function(id, callback){
		request(this.BASE + "user/get/?id=" + id, function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	getUserListFollowers : function(username, page, callback){
		this.getUserList(username, page, "listFollowers", callback);
	},

	getUserListFollowings : function(username, page, callback){
		this.getUserList(username, page, "listFollowings", callback);
	},

	getUserList : function(username, page, type, callback){
		request(this.BASE + "user/"+type+"/?username=" + username + this.addPage(page), function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});	
	},

	/* Category */
	getCategoryList : function(){
		request(this.BASE + "category/list", function(e, r, b){
			var json;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		});
	},

	convertIdsToString : function(ids){
		if (Array.isArray(ids)){
			return ids.join(",");
		}
		return ids;
	},
	/* Helper Functions */
	addPage : function(page, start){
		var q = ((start === null)?"&":start)+"page="
		if (Array.isArray(page)){
			return q+page.join(",");			
		}else if (this.isNumeric(page) && page != 0){
			q += page;
			return q;
		}
		return "";
	},

	isNumeric : function(id){
		return /^-?[0-9]+$/.test(id);
	}

}

module.exports = nodeQuote;
