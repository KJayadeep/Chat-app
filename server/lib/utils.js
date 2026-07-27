import jwt from "jsonwebtoken";

//function to generate a jwt token
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    return token;
};