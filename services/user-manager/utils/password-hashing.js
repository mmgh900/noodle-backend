const bcrypt = require("bcrypt");

/**
 * @param password {string}
 * @returns {Promise<string>}
 */
exports.hashPassword = async (password) => {
    return await bcrypt.hash(password , 14);
}

/**
 * @param enteredPassword {string}
 * @param userHashedPassword {string}
 * @returns {Promise<string>}
 */
exports.comparePassword = async (enteredPassword , userHashedPassword)=>{
    return await bcrypt.compare(enteredPassword, userHashedPassword);
}