var Sails = require('sails');

before(function (done) {
    process.env.NODE_ENV = 'test';
    process.env.PORT = 9999;

    Sails.lift({
        models: {
            datastore: 'test',
            migrate: 'safe'
        }

    }, function (err, server) {
        sails = server;
        if (err) return done(err);
        sails.log.info('***** Starting tests... *****');
        done(null, sails);
    });
});

after(function (done) {
    sails.lower(done);
});