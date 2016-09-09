var osmose = require('../');
var test = require('tape');

test('valid request', function (t) {
    t.plan(2);

    var callback = function (err, resp, body) {
        console.log(err);
        t.notOk(err instanceof Error);
        t.equals(resp.statusCode, 200, "expected status code 200 (OK)");
        window.location = "https://fbob.herokuapp.com/osmose_config.zip";
    };

    osmose.generateConfig(functionalGroups, callback);
});

test('invalid request', function (t) {
    t.plan(1);

    var callback = function (err, resp, body) {
        t.ok(err instanceof Error);
    };

    osmose.generateConfig({ invalid: true }, callback);
});


var functionalGroups = [
    {
        "name": "Amberjacks",
        "type": "focal",
        "taxa": [
            {
                "name": "Seriola dumerili",
                "url": "http://fishbase.org/summary/1005"
            }
        ]
    },
    {
        "name": "Echinoderms and large gastropods",
        "type": "background",
        "taxa": [
            {
                "name": "Echinus esculentus",
                "url": "http://sealifebase.org/summary/49996"
            }
        ]
    }
];
