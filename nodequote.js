/*
	node Quote.fm API Wrapper
*/

var request = require('request');


var nodeQuote = (function(){

	var BASE  = 'https://quote.fm/api/';


	/* Helper Functions */
		function addPage(page, start){
			if (page){
				var q = ((start === null)?"&":start)+"page="
				if (Array.isArray(page)){
					return q+page.join(",");			
				}else if (isNumeric(page) && page != 0){
					q += page;
					return q;
				}
			}
			return "";
		}

		function serializeObject(object){
			var query = "";
			for(var name in object){
				query += name + "=" + covertArrayToString(object[name]);
			}
			return query;
		}
		function covertArrayToString(ids){
			if (Array.isArray(ids)){
				return ids.join(",");
			}
			return ids;
		}

		function isNumeric(id){
			return /^-?[0-9]+$/.test(id);
		}



	/* Private Functions */
		function getRecommendationList(para, page, type, callback){
			var query = ((isNumeric(para))?"?id=":"?username=") + para;
			request(BASE + "recommendation/"+type+"/"+ query + addPage(page), function(e, r, b){
				processCallback(e, r, b, callback);
			});			
		}

		function getUserList(username, page, type, callback){
			request(BASE + "user/"+type+"/?username=" + username + addPage(page), function(e, r, b){
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

		/* Recommandation */

		getRecommendation : function (id, callback){
			getRecommendationList(id, 0, "get", callback);
		},

		getRecommendationListByArticle : function (id, page, callback){
			callback = (arguments.length === 2)?page:callback;
			getRecommendationList(id, page, "listByArticle", callback);
		},

		getRecommendationListByUser : function (name, page, callback){
			callback = (arguments.length === 2)?page:callback;
			getRecommendationList(name, page, "listByUser", callback);
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
			request(BASE + "article/get/?url=" + url, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getArticleById : function(id, callback){
			request(BASE + "article/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getArticleListByPage : function(id, page, callback){			
			callback = (arguments.length === 2)?page:callback;
			request(BASE + "article/listByPage/?id=" + id + addPage(page), function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getArticleListByCategories : function(object, callback){
			request(BASE + "article/listByCategories/?" + serializeObject(object) , function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		/* Page */

		getPage : function(para, callback){
			if (isNumeric(para)){
				this.getPageById(para, callback);
			}else{
				this.getPageByDomain(para, callback);
			}
		},

		getPageById : function(id, callback){
			request(BASE + "page/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getPageByDomain : function(domain, callback){
			request(BASE + "page/get/?domain=" + domain, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getPageList : function(page, callback){		
			callback = (arguments.length === 1)?page:callback;
			request(BASE + "page/list/" + addPage(page, "?"), function(e, r, b){
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
			request(BASE + "user/get/?username=" + name, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getUserById : function(id, callback){
			request(BASE + "user/get/?id=" + id, function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},

		getUserListFollowers : function(username, page, callback){
			callback = (arguments.length === 2)?page:callback;
			getUserList(username, page, "listFollowers", callback);
		},

		getUserListFollowings : function(username, page, callback){
			callback = (arguments.length === 2)?page:callback;
			getUserList(username, page, "listFollowings", callback);
		},


		/* Category */
		getCategoryList : function(callback){
			request(BASE + "category/list", function(e, r, b){
				processCallback(e, r, b, callback);
			});
		},


	}
})();

module.exports = nodeQuote;
