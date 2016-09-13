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

var validateConfig = function (config) {
    if (Array.isArray(config)) {
        return ['expected object, but got array: ' + JSON.stringify(config)];
    }

    if (config['groups'] === undefined) {
        return ['[groups] undefined for ' + JSON.stringify(config)];
    }

    return validateGroups(config.groups);
};

osmose.generateConfig = function generateConfig(config, callback) {
    var errors = validateConfig(config);
    if (errors.length > 0) {
        callback(new Error(errors.join()), null, null)
    } else {
        var fileReader = new FileReader();
        fileReader.addEventListener("load", function() {
            callback(null, fileReader.result);
        });

        xhr.post({
            body: JSON.stringify(config),
            uri: "https://fbob.herokuapp.com/v2/osmose_config.zip",
            responseType: 'blob',
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, resp, body) {
            if (resp.statusCode == 200) {
                var blob = new Blob([body], { type: "application/zip" });
                fileReader.readAsDataURL(blob);
            } else {
                callback(err, null);
            }

        });
    }
};

module.exports = osmose;