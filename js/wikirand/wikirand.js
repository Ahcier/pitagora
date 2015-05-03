
var Test_class = function(){
	this.name = 'Test_class';
	this.test_method = function(){
		console.log('i have done it');
	};
}

//var titles = [];

var Wikirand = function(){

	this.ajax_rand_titles = 
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "http://ja.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&format=json",
		})
	
		.then(function(json){
			//配列に記録
			var titles = [];
			//console.log(json);
			$.each(json.query.random, function(i,e){
				titles.push(e.title);
			});
			return titles;
		});
}
