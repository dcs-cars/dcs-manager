module.exports = function(term,fields){
	var words = term.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/\s\s+/g," ").split(" ");
	return {
		$and:words.map(word=>({$or:fields.map(field=>{
			var o = {};
			o[field] = {$regex:word,$options:"i"};
			return o;
		})}))
	}

}
