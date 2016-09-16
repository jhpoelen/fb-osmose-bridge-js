var osmose = require('../');
var test = require('tape');

test('valid request', function (t) {
    t.plan(2);

    var callback = function (err, url) {
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

test('invalid request: no background groups', function (t) {
    t.plan(1);

    var callback = function (err, resp, body) {
        t.ok(err instanceof Error);
    };


    osmose.generateConfig({ timeStepsPerYear: 123, groups: [focalGroup]}, callback);
});

test('invalid request: no focal groups', function (t) {
    t.plan(1);

    var callback = function (err, resp, body) {
        t.ok(err instanceof Error);
    };


    osmose.generateConfig({ timeStepsPerYear: 123, groups: [backgroundGroup]}, callback);
});


var backgroundGroup = {
    name: "Echinoderms and large gastropods",
    type: "background",
    taxa: [
        {
            name: "Echinus esculentus",
            url: "http://sealifebase.org/summary/49996"
        }
    ]
};

var focalGroup = {
    name: "Amberjacks",
    type: "focal",
    taxa: [
        {
            name: "Seriola dumerili",
            url: "http://fishbase.org/summary/1005"
        }
    ]
};
var groupsOnly = [
    focalGroup,
    backgroundGroup
];
var validConfig = {
    timeStepsPerYear: 123,
    groups: groupsOnly
};
