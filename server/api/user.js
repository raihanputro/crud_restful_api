const Router = require('express').Router();
const fs = require("fs");
const path = require("path");
const dbPath = path.resolve(__dirname, '../../assets/db.json');

const { responseSuccess, responseError } = require('../helpers/responseHandler');

const getUser = async ( req, res ) => {
    try {
        fs.readFile(dbPath, (error, data) => {
            if (error) {
                console.log(error);

                throw error;
            }
            const user = JSON.parse(data);

            return responseSuccess(res, 200, 'Success get user', user.user);
        })
    } catch (error) {
        return responseError(res, 400, 'Cannot get user');
    }
};

const getDetailUser = async ( req, res ) => {
    try {
        const getId = parseInt(req.params['id']);

        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        const userDetail = data.user.find(usr => usr.id === getId);

        if(!userDetail) {
            return responseError(res, 404, 'Cannot find detail user');
        }

        return responseSuccess(res, 200, 'Success get detail user', userDetail);
    } catch (error) {
        return responseError(res, 400, 'Cannot get detail user');
    }
};

const addUser = async ( req, res ) => {
    try { 

        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        var last = data.user.length - 1;

        console.log(last, 'last');

        const userData = {
            "id": last + 1,
            "fullname": req.body.fullname,
            "email": req.body.email,
            "password": req.body.password
        }

        data.user.push(userData);

        fs.writeFileSync(dbPath, JSON.stringify(data));

        return responseSuccess(res, 200, 'Success post user', userData);
    } catch (error) {
        return responseError(res, 400, 'Cannot post user');
    }
};

const updateUser = async ( req, res ) => {
    try {
        const getId = parseInt(req.params["id"]);

        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        const userToUpdate = data.user.find(item => item.id === getId);

        console.log(userToUpdate)

        if(!userToUpdate) {
            return responseError(res, 404, 'Cannot find user');
        }

        userToUpdate["fullname"] = req.body.fullname; 
        userToUpdate["email"] = req.body.email; 
        userToUpdate["password"] = req.body.password;

        fs.writeFileSync(dbPath, JSON.stringify(data));

        return responseSuccess(res, 200, 'Success update user', userToUpdate);
    } catch (error) {
        console.log(error)
        return responseError(res, 400, 'Cannot update user');
    }
};

const deleteUser = async ( req, res ) => {
    try {
        const getId = parseInt(req.params["id"]);

        const rawData = fs.readFileSync(dbPath);
        const data = JSON.parse(rawData);

        const userToDelete = data.user.find(item => item.id === getId);

        if(!userToDelete) {
            return responseError(res, 404, 'Cannot find user');
        }

        for (let [i, user] of data.user.entries()) {
            if(user.id === getId) {
                data.user.splice(i, 1);
            }
        }

        fs.writeFileSync(dbPath, JSON.stringify(data));

        return responseSuccess(res, 200, 'Success delete user');

    } catch (error) {   
        return responseError(res, 400, 'Cannot delete user');
    }
}

Router.get('/', getUser);
Router.get('/:id', getDetailUser);
Router.post('/add', addUser);
Router.put('/update/:id', updateUser);
Router.delete('/delete/:id', deleteUser);

module.exports = Router;