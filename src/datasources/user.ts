const {RESTDataSource} = require('apollo-datasource-rest');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {getDocument, addDocument} = require('../database/util');
const {userSchema} = require('../database/schemas');
const {USER, TOKEN_SECRET_KEY} = require('../database/constants');

export class UserAPI extends RESTDataSource {
    constructor() {
        super();
    }


    async signup(body: any) {
        console.log('signup called');

        const data = await getDocument({collection: USER, schema: userSchema, query: {email: body.email}});
        if (data.length) {
            return {message: "User already exists."};

        }
        else {
            try {
                const hash = await bcrypt.hash(body.password, 10);
                let query = {
                    name: body.name,
                    email: body.email,
                    password: hash,
                };
                const result = await addDocument({collection: USER, schema: userSchema, query});
                console.log(result.toObject())
                return {
                    user: {
                        _id: result._id,
                        email: result.email,
                        name: result.name,
                    },
                    message: "success"
                };
            }
            catch (err) {
                throw (err);
            }

        }
    }

    async signin(body: any) {
        console.log('login called');

        const doc = await getDocument({collection: USER, schema: userSchema, query: {email: body.email}});

        if (!doc.length) {

            return {message: "Email not recognized."};
        }

        const verified = await bcrypt.compare(body.password, doc[0].password);

        if (!verified) {

            return {
                message: "Invalid Credentials."
            }

        }

        const token = jwt.sign(
            {
                email: doc[0].email,
                userId: doc[0]._id,
                name: doc[0].name
            },
            TOKEN_SECRET_KEY
            // {
            //   expiresIn: "10h"
            // }
        );

        return {
            message: "authorized",
            token: token,
            user: {
                _id: doc[0]._id,
                email: doc[0].email,
                name: doc[0].name,
            }
        }
    }


}