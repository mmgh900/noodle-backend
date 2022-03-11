const jwt = require('jsonwebtoken')
const c = require('../../../config')

/**
 * @param username {string}
 * @param type {string}
 * @returns {string}
 */
module.exports.createToken = (username, type) => {
    return jwt.sign(
        {
            username: username,
            type: type
        },
        c.authConfig.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    )
}


