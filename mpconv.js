function conv_mp(str){
	
	var conv_1 = function(conv_str, op){
		if(op == "DIV"){
			var div = conv_str.split(';');
			return '(' + div[0] + ')/(' + div[1] + ')';
		}else if(op == "RT"){
			return 'sqrt(' + conv_str + ')';
		}else if(op == "SUP"){
			return '^(' + conv_str + ')';
		}
	}
	
	var res = '';
	var opStack = [];
	var opAtIndex = [];
	var at = 0;
	var opC1Index = [];
	var c1 = 0;
	var reg = /[@|}]/g;
	while(res = reg.exec(str)){
		//console.log(res[0]+' : '+res.index+' : '+reg.lastIndex);
		if(res[0] == '@'){
			at = res.index;
			c1 = str.indexOf('{', c1+1);
			opC1Index.push(c1);
			opAtIndex.push(at);
			//console.log(res.index+' : '+str.substring( at+1, c1));
			opStack.push(str.substring( at+1, c1 ));
		}
		else if(res[0] == '}'){
			//console.log(res.index+' : }');
			var inside = str.substring(opC1Index.pop()+1, res.index);
			var op = opStack.pop();
			var parsed = conv_1(inside, op);
			reg.lastIndex += (parsed.length - inside.length - op.length - 3); //subtracts @,opName,{,}
			str = str.substring(0, opAtIndex.pop()) + parsed + str.substring(res.index+1);
			console.log('str : '+str);
		}
		//console.log(res[0]+' : '+res.index+' : '+reg.lastIndex);
	}
	return str;
}