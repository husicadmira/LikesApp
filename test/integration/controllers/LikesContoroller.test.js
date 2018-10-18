var request = require('supertest'),
    should = require('should');

function createLoginAgent(loginDetails, done) {
    request(sails.hooks.http.app)
        .post('/login')
        .send(loginDetails)
        .end(function (error, response) {
            if (error) {
                throw error;
            }
            var loginAgent = request.agent();
            done(token);
        });
};

describe('Likes controller', function () {

    before(function (done) {
        done(null, sails);
    });



 it('Liking user that is not already liked returns status 200', function (done) {
        createLoginAgent({ username: 'testuser', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .post('/user/2')
                .set('token', response)
                .expect(200, done)

        });

    });

    it('Liking user that is already liked by logged user returns message "User id is already liked"', function (done) {
        createLoginAgent({ username: 'testuser', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .post('/user/2')
                .set('token', response)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.message.should.equal('User 2 is already liked');
                    done();
                });

        });

    });


    it('Unliking user that is liked returns status code 200', function (done) {
        createLoginAgent({ username: 'testuser', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .delete('/user/2')
                .set('token', response)
                .expect(200, done)
        });

    });





});

