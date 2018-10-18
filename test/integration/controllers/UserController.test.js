var request = require('supertest'),
    should = require('should');
_ = require('lodash');
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

describe('User Controller', function () {
    before(function (done) {
        done(null, sails);
    });

    it('Getting existing user returns object', function (done) {
        request(sails.hooks.http.app)
            .get('/user/1')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                should.exist(res.body);
                done();
            });
    });

    it('Getting non existing user returns message "User not found"', function (done) {
        request(sails.hooks.http.app)
            .get('/user/90')
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.message.should.equal("User not found");
                done();
            });
    });


    it('Most-liked endopint should return array of 5 elements', function (done) {
        request(sails.hooks.http.app)
            .get('/most-liked')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.users.length.should.equal(6);
                done();
            });
    });


    it('Me endpoint should returns status code 200 when route is authenticated', function (done) {
        createLoginAgent({ username: 'testuser', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .get('/me')
                .set('token', response)
                .expect(200, done)


        });

    });

    it('Me endpoint should returns status code 400 when route is not authenticated', function (done) {
        createLoginAgent({ username: 'testinvalid', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .get('/me')
                .set('token', response)
                .expect(200, done)


        });

    });
    it('Getting user with invalid token returns message "Token not valid"', function (done) {
        createLoginAgent({ username: 'testinvalid', password: 'testpassword' }, function (response) {
            request(sails.hooks.http.app)
                .get('/me')
                .set('token', "aaa")
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.message.should.equal("Token not valid");
                    done();
                });
        });
    })
    it('Create user with correct credentials should return status 200', function (done) {
        request(sails.hooks.http.app)
            .post('/signup')
            .send({
                username: "testnew",
                password: "passwordnew"
            })
            .expect(200, done)
    });

    it('Update password rout should return status 200', function (done) {
        createLoginAgent({ username: 'testuser4', password: 'testpassword4' }, function (response) {
            request(sails.hooks.http.app)
                .patch('/me/update-password').
                send({ 'password': 'testpasswordchanged' })
                .set('token', response)
                .expect(200, done)


        });

    });

});