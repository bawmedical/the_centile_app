var UK90centile = require('UK90centile');

var calcAge = function(y,m,w) {
	var calcAge = 0;
	if (m) calcAge = (m*30); //its rough but only dealing with half months anyway
	if (w) calcAge += (w*7);
	if (calcAge) calcAge=(Math.round((calcAge/365)*100))/100
	return +(y + calcAge);
};
var getStats = function(ewd,age) {
	if (!centileXIx) var centileXIx = new ewd.mumps.GlobalNode("cpcCentile", ["CentileIx","age"]);
	if (!centileIx) var centileIx = new ewd.mumps.GlobalNode("cpcCentile", ["Centile"]);
		if (centileXIx.$(age)._hasValue) {
			var next=age;
		}
		else {
			var next = centileXIx._next(age);
		};
		var id = centileXIx.$(next)._value;
		ewd.log('-------------- Next = '+next,1);
		ewd.log('-------------- Age = '+age,1);
		ewd.log('-------------- id = '+id,1);
		return centileIx.$(id)._getDocument();
};
module.exports = {
	//external call - check reload
	swagger: function(ewd,path) {
		if (!hDocsix) var hDocsix = new ewd.mumps.GlobalNode("cpcCentile", ["Documentation"]);	
		if (path) {
			if (path.length > 2  && path[2] !='' ) {
				return hDocsix.$(path[2])._getDocument();
				}
		};
		return hDocsix.$('control')._getDocument();
	},
	getCentileByHeight: function(ewd,AgeY,AgeM,AgeW,HeightM,Sex) {
		var age=calcAge(+AgeY,+AgeM,+AgeW);
		var stats=getStats(ewd,age);
		var LMSin=[];
		if (Sex==='Male') {
			LMSin=[stats.Height_Male_L,stats.Height_Male_M,stats.Height_Male_S] 
		}
		else
		{
			LMSin=[stats.Height_Female_L,stats.Height_Female_M,stats.Height_Female_S] 
		}
		ewd.log('---------------- '+JSON.stringify(LMSin),1);
		return {"Centile": UK90centile.lmsToCentile(HeightM*100,LMSin)};
	}
};