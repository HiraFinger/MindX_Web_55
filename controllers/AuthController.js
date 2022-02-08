const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findByUsername, insertUser } = require("../database/user");

const login = async (username, password) => {
    // Step 1: Find user by username
    const existedUser = await findByUsername(username);
    if (!existedUser) {
        throw new Error("Username is not exist");
    }
    // Step 2: Verify password
    if (!verifyPassword(password, existedUser)) {
        throw new Error("Password is not correct");
    }
    // Step 3: Generate JWT
    const token = jwt.sign({ userId: existedUser._id }, "MY_PRIVATE_KEY", {
        expiresIn: 60 * 60,
    });
    return { user: existedUser, token: token };
};
const register = async (username, email, password) => {
    // Step 1: Check username is existed
    const existedUser = await findByUsername(username);
    if (existedUser) {
        throw new Error("Username is existed!");
    }
    // Step 2: Encrypt  the password
    const { salt, hashedPassword } = encryptPassword(password);

    // Step 3: Store inside database
    const insertedUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword,
    });
    return insertedUser;
};

const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");

    return hashedPassword === user.hashedPassword;
};

const encryptPassword = (password) => {
    // Private key for each user
    const salt = crypto.randomBytes(128).toString("hex");

    // Harsed password
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hashedPassword: hashedPassword,
    };
};

module.exports = { login, register };
