const responseSuccess = ( res, status, statusMessage, data ) => {
    return res.status(status).json({ sucsess: true, status: statusMessage, result: data })
};

const responseError = ( res, status, statusMessage ) => {
    return res.status(status).json({ sucsess: false, status: statusMessage })
};

module.exports = ({ responseSuccess, responseError})
