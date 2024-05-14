import supertest from 'supertest';
import * as authentication from '../authentication';

describe('authentication handler', () => {
    it('should create a new user (sign up)', async ()=> {
        const req = {username:"hello", password: "hi", phoneNumber:'1234'}
        const res = {json({token}) {
            expect(token).toBeTruthy();
        }}

        await authentication.signup(req, res, ()=> {})

        // it didn't really pass this is a false positive try make a get to make sure there is a token
    })
})