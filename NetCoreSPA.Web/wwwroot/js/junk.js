//Get Id in DOM:
var oTable = document.getElementById('sets_grid');
$('#sets_grid')


 //var set1 = fromCamel(sets);
        //var setStr = JSON.stringify(set1);
        //var setParse = JSON.parse(setStr);

//function fromCamel(o) {
//    var newO, origKey, newKey, value;
//    if (o instanceof Array) {
//        return o.map(function (value) {
//            if (typeof value === "object") {
//                value = fromCamel(value);
//            }
//            return value;
//        });
//    } else {
//        newO = {};
//        for (origKey in o) {
//            if (o.hasOwnProperty(origKey)) {
//                newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString();
//                value = o[origKey];
//                if (value instanceof Array || (value !== null && value !== undefined && value.constructor === Object)) {
//                    value = fromCamel(value);
//                }
//                newO[newKey] = value;
//            }
//        }
//    }
//    return newO;
//}