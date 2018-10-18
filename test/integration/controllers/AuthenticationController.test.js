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
            done(response);
        });
};

describe('Authentication controller', function () {
    it('Login with correct credentials returns status code 200', function (done) {
        createLoginAgent({username:'testuser', password:'testpassword'}, function (response) {
            response.statusCode.should.equal(200)
            done();
        });

    });

    it('Login with incorrect credentials returns status code 400', function (done) {
        createLoginAgent({ username: 'testuser', password: 'passwordnotvalid' }, function (response) {
            response.statusCode.should.equal(400)
            done();
        });
    });

    it('Login with non existing credentials returns status code 404', function (done) {
        createLoginAgent({ username: 'testinvalid', password: 'passwordnotvalid' }, function (response) {
            response.statusCode.should.equal(404)
            done();
        });
    });
})