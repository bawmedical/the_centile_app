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

var centile = require('Centile');
module.exports = {

  parse: function(ewd) {
    var path = ewd.query.rest_path.split('/');
	if (path[1] === 'swagger') {
		return centile.swagger(ewd,path);
    };
	if (path[1] === 'GetHeight') {
      return centile.getCentileByHeight(ewd,ewd.query.AgeInYears,ewd.query.AgeInMonths,ewd.query.AgeInWeeks,ewd.query.HeightInMetres,ewd.query.Sex);
    };
	if (path[1] === 'GetWeight') {
      return centile.getCentileByWeight(ewd,ewd.query.AgeInYears,ewd.query.AgeInMonths,ewd.query.AgeInWeeks,ewd.query.WeightInKG,ewd.query.Sex);
    };
	if (path[1] === 'GetBMI') {
      return centile.getBMI(ewd,ewd.query.WeightInKG,ewd.query.HeightInMetres);
    };
	if (path[1] === 'GetBMICentile') {
      return centile.getCentileByBMI(ewd,ewd.query.AgeInYears,ewd.query.AgeInMonths,ewd.query.AgeInWeeks,ewd.query.BMI,ewd.query.Sex);
    };
	if (path[1] === 'GetAllCentiles') {
      return centile.getAllCentiles(ewd,ewd.query.AgeInYears,ewd.query.AgeInMonths,ewd.query.AgeInWeeks,ewd.query.WeightInKG,ewd.query.HeightInMetres,ewd.query.Sex);
    };
    return {
      "error": {
        "text": "Unrecognized Service",
        "statusCode": 400
      }
    };
  }
};
