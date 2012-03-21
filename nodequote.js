/*
	node Quote.fm API Wrapper
*/

var request = require('request');


var nodeQuote = (function(){

	/* Helper Functions */
		function addPage(page, start){
			var q = ((start === null)?"&":start)+"page="
			if (Array.isArray(page)){
				return q+page.join(",");			
			}else if (isNumeric(page) && page != 0){
				q += page;
				return q;
			}
			return "";
		}

		function convertIdsToString(ids){
			if (Array.isArray(ids)){
				return ids.join(",");
			}
			return ids;
		}

		function isNumeric(id){
			return /^-?[0-9]+$/.test(id);
		}



	/* Private Functions */

		function getRecommendationList(id, page, type, callback){
			request(this.BASE + "recommendation/"+type+"/?id=" + id + this.addPage(page), function(e, r, b){
				processCallback(e, r, b, callback);
			});			
		}

		var getUserList  =  function(username, page, type, callback){
			request(this.BASE + "user/"+type+"/?username=" + username + this.addPage(page), function(e, r, b){
				processCallback(e, r, b, callback);
			});	
		}

		function processCallback(e, r, b, callback){
			var json = null;
			if (!e) {
				json = JSON.parse(b);
			}	
			callback(json, e);
		}

	return {

		API_VERSION : '1.0.3',

		BASE : 'https://quote.fm/api/',

		/* Recommandation */

		getRecommendation : function (id, callback){
			getRecommendationList(id, 0, "get", callback);
		},

		getRecommendationListByArticle : function (id, page, callback){
			getRecommendationList(id, page, "listByArticle", callback);
		},

		getRecommendationListByUser : function (id, page, callback){
			getRecommendationList(id, page, "listByUser", callback);
		},

		/* Article */
		
		getArticle : function(para, callback){
			if (isNumeric(para)){
				this.getArticleById(para, callback);
			}else{
				this.getArticleByUrl(para, callback);
			}
		},

		getArticleByUrl : function(url, callback){
			request(this.BASE + "article/get/?url=" + url, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getArticleById : function(id, callback){
			request(this.BASE + "article/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},


		getArticleListByPage : function(id, page, callback){
			request(this.BASE + "article/listByPage/?id=" + id + this.addPage(page), function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getArticleListByCategories : function(ids, page, language, scope, callback){
			request(this.BASE + "article/listByCategories/?ids=" + convertIdsToString(ids) + this.addPage(page) + "&language="+language + "&scope="+scope, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		/* Page */

		getPage : function(para, callback){
			if (isNumeric(para)){
				this.getPageById(para, callback);
			}else{
				this.getPageByUrl(para, callback);
			}
		},

		getPageById : function(id, callback){
			request(this.BASE + "page/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getPageByDomain : function(domain, callback){
			request(this.BASE + "page/get/?domain=" + domain, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getPageList : function(page, callback){
			request(this.BASE + "page/list/" + this.addPage(page, "?"), function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		/* User */

		getUser : function(para, callback){
			if (isNumeric(para)){
				this.getUserById(para, callback);
			}else{
				this.getUserByName(para, callback);
			}
		},

		getUserByName : function(name, callback){
			request(this.BASE + "user/get/?username=" + name, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getUserById : function(id, callback){
			request(this.BASE + "user/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getUserListFollowers : function(username, page, callback){
			getUserList(username, page, "listFollowers", callback);
		},

		getUserListFollowings : function(username, page, callback){
			getUserList(username, page, "listFollowings", callback);
		},


		/* Category */
		getCategoryList : function(){
			request(this.BASE + "category/list", function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},


	}
})();

module.exports = nodeQuote;
