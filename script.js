


var yql = "https://query.yahooapis.com/v1/public/yql?q= "+ encodeURIComponent("select * from html where url='http://www.dsebd.org/latest_share_price_all_by_ltp.php'") + "&format=json&callback=?";


var promise ;
var userGivenTime = 60000;

var realTime = function(e){
	userGivenTime =e*60000;
	
}
var callTimer = function(){

	console.log(userGivenTime);
	 promise = setInterval(function(){
	
		callOtherDomain();
	},userGivenTime);
}

var clearTimer =function(){
	clearInterval(promise);
}

var callOtherDomain = function(){

	$.ajax({

		url  	 : yql,
		type 	 : "GET",
		dataType : "jsonp",
		success :function(ans){
			console.log(ans.query.results.body.div.table.tbody.tr.length);
			callServer(ans);
		}
	});
}


var callServer =function(ans){

	var result = [];
	var len  =ans.query.results.body.div.table.tbody.tr.length;
	var tree = ans.query.results.body.div.table.tbody.tr;


	var x = tree[0].td[1].b+ ","+tree[0].td[2].b +"," + tree[0].td[3].b +"," +tree[0].td[4].b +"," +tree[0].td[5].b;
	result.push(x);

	for( i =1; i<len ;i++){
		
		var x = tree[i].td[1].a.content + " ," +(tree[i].td[2].content).replace(",","") + "," + (tree[i].td[3].content).replace(",","")+","+
				(tree[i].td[4].content).replace(",","") + "," + (tree[i].td[5].content).replace(",","");
		
		result.push(x.toString());
	}
		

	$.ajax({

		url      : "server.php",
		type     : "POST",
		dataType :  "json",
		data     : JSON.stringify({command: "go",csv : result}),
		cache    : false,
		
		success  : function(ans){
			console.log("calling server ->"+JSON.stringify(ans));
		},
		error : function(err){
			console.log(err);
		}
	});
}




