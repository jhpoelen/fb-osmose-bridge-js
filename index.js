var xhr = require('xhr');
var osmose = {};

var validateGroup = function (errors, group) {
    if (group['name'] === undefined) {
        errors.push('[name] undefined for [' + JSON.stringify(group));
    }
    if (group['type'] === undefined) {
        errors.push('[type] undefined for [' + JSON.stringify(group));
    }

    if (group['taxa'] === undefined) {
        errors.push('[taxa] undefined for ' + JSON.stringify(group));
    }

    return errors;
};

var validateGroups = function (groups) {
    if (Array.isArray(groups)) {
        return groups.reduce(validateGroup, []);
    } else {
        return ['expected array, but got: ' + JSON.stringify(groups)];
    }
};

osmose.generateConfig = function generateConfig(functionalGroups, callback) {
    var errors = validateGroups(functionalGroups);
    if (errors.length > 0) {
        callback(new Error(errors.join()), null, null)
    } else {
        xhr.post({
            body: JSON.stringify(functionalGroups),
            uri: "https://fbob.herokuapp.com/osmose_config.zip",
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, resp, body) {
            callback(err, resp, body);
        });
    }
};

module.exports = osmose;