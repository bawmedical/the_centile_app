/*
	UK Centile public service
	Author: Chris Casey
	Copyright 2014 CPC Computer Solutions Ltd.
 
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
 
       http://www.apache.org/licenses/LICENSE-2.0
 
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var UK90centile = require('UK90');

var calcAge = function(y,m,w) {
	var calcAge = 0;
	if (m) calcAge = (m*30); //its rough but only dealing with half months anyway
	if (w) calcAge += (w*7);
	if (calcAge) calcAge=(Math.round((calcAge/365)*100))/100
	return +(y + calcAge);
};
var getStats = function(ewd,age) {
	if (!centileXIx) var centileXIx = new ewd.mumps.GlobalNode("cpcCentile", ["CentileIx","UK90","age"]);
	if (!centileIx) var centileIx = new ewd.mumps.GlobalNode("cpcCentile", ["Centile","UK90"]);
	if (!centileCount) var centileCount = new ewd.mumps.GlobalNode("cpcCentile", ["Count"]);
	centileCount._value = centileCount._value+1;
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

	onSocketMessage: function(ewd) {
		var wsMsg = ewd.webSocketMessage;
		var type = wsMsg.type;
		var params = wsMsg.params;
		if (type === 'getCentiles') {
			if (!params.sex) return {error:'You must select a Sex'};
			if (params.ageInYears === '') return {error:'You must enter an age'};
			if (!params.weightInKg) return {error:'You must enter a weight'};
			if (!params.heightInM) return {error:'You must enter a height'};
			var result=this.getAllCentiles(ewd,params.ageInYears,params.ageInMonths,0,params.weightInKg,params.heightInM,params.sex);
			var error=result.error;
			if (error) return error;
			ewd.sendWebSocketMsg({
			  type: 'getCentiles',
			  message: result
			});
			return;
		};

	},
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
		if (age <0 || age > 23) return {error: {text: 'Age must be between 0 and 23', statuscode: 400}};
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
		return UK90centile.getData(HeightM*100,LMSin);
	},
	getCentileByWeight: function(ewd,AgeY,AgeM,AgeW,WeightK,Sex) {
		var age=calcAge(+AgeY,+AgeM,+AgeW);
		if (age <0 || age > 23) return {error: {text: 'Age must be between 0 and 23', statuscode: 400}};
		var stats=getStats(ewd,age);
		var LMSin=[];
		if (Sex==='Male') {
			LMSin=[stats.Weight_Male_L,stats.Weight_Male_M,stats.Weight_Male_S] 
		}
		else
		{
			LMSin=[stats.Weight_Female_L,stats.Weight_Female_M,stats.Weight_Female_S] 
		}
		ewd.log('---------------- '+WeightK+',  '+JSON.stringify(LMSin),1);
		return UK90centile.getData(WeightK,LMSin);
	},
	getBMI: function(ewd,WeightK,HeightM) {
			return {"BMI": WeightK/(Math.pow(HeightM,2))};
		},
	getCentileByBMI: function(ewd,AgeY,AgeM,AgeW,BMI,Sex) {
		var age=calcAge(+AgeY,+AgeM,+AgeW);
		if (age <0 || age > 23) return {error: {text: 'Age must be between 0 and 23', statuscode: 400}};
		var stats=getStats(ewd,age);
		var LMSin=[];
		if (Sex==='Male') {
			LMSin=[stats.BMI_Male_L,stats.BMI_Male_M,stats.BMI_Male_S] 
		}
		else
		{
			LMSin=[stats.BMI_Female_L,stats.BMI_Female_M,stats.BMI_Female_S] 
		}
		ewd.log('---------------- '+JSON.stringify(LMSin),1);
		return UK90centile.getData(BMI,LMSin);
	},
	getAllCentiles: function(ewd,AgeY,AgeM,AgeW,WeightK,HeightM,Sex) {
		var age=calcAge(+AgeY,+AgeM,+AgeW);
		if (age <0 || age > 23) return {error: {text: 'Age must be between 0 and 23', statuscode: 400}};
		var stats=getStats(ewd,age);
		var BMI=this.getBMI(ewd,WeightK,HeightM).BMI;
		var LMSin=[],LMSin2=[],LMSin3=[];
		if (Sex==='Male') {
			LMSin=[stats.Height_Male_L,stats.Height_Male_M,stats.Height_Male_S];
			LMSin2=[stats.Weight_Male_L,stats.Weight_Male_M,stats.Weight_Male_S];
			LMSin3=[stats.BMI_Male_L,stats.BMI_Male_M,stats.BMI_Male_S];
		}
		else
		{
			LMSin=[stats.Height_Female_L,stats.Height_Female_M,stats.Height_Female_S];
			LMSin2=[stats.Weight_Female_L,stats.Weight_Female_M,stats.Weight_Female_S];
			LMSin3=[stats.BMI_Female_L,stats.BMI_Female_M,stats.BMI_Female_S];
		}
		var retObj=UK90centile.getData(HeightM*100,LMSin);
		var retObj2=UK90centile.getData(WeightK,LMSin2);
		var retObj3=UK90centile.getData(BMI,LMSin3);
		return {
			HeightStats:retObj,
			WeightStats:retObj2,
			BMI:BMI,
			BMIStats:retObj3,
			DebugStats:{HeightLMS:LMSin,WeightLMS:LMSin2,BMILMS:LMSin3}
		};
	}

};