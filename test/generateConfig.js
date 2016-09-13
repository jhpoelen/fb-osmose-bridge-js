var osmose = require('../');
var test = require('tape');

test('valid request', function (t) {
    t.plan(2);

    var callback = function (err, url) {
        console.log(err);
        t.notOk(err instanceof Error);
        t.ok(url.indexOf("data:") > -1);
    };

    osmose.generateConfig(validConfig, callback);
});

test('no longer valid request', function (t) {
    t.plan(1);

    var callback = function (err, resp, body) {
        t.ok(err instanceof Error);
    };

    osmose.generateConfig(groupsOnly, callback);
});

test('invalid request', function (t) {
    t.plan(1);

    var callback = function (err, resp, body) {
        t.ok(err instanceof Error);
    };

    osmose.generateConfig({ donald: "duck" }, callback);
});


var groupsOnly = [
    {
        name: "Amberjacks",
        type: "focal",
        taxa: [
            {
                name: "Seriola dumerili",
                url: "http://fishbase.org/summary/1005"
            }
        ]
    },
    {
        name: "Echinoderms and large gastropods",
        type: "background",
        taxa: [
            {
                name: "Echinus esculentus",
                url: "http://sealifebase.org/summary/49996"
            }
        ]
    }
];
var validConfig = {
    timeStepsPerYear: 123,
    groups: groupsOnly
};
