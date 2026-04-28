import jwt, {} from 'jsonwebtoken';
import User from '../model/User.js';
export const isAuth = async (req, res, next) => {
    try {
        const AuthHeader = req.headers.authorization;
        if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
            res.status(401).json({ message: "Unauthorized pls Login first" });
            return;
        }
        const token = AuthHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized pls login first !" });
            return;
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: "JWT secret is not configured" });
            return;
        }
        const decoded = jwt.verify(token, secret);
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Token is invalid pls Login first !" });
            return;
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: "User not found for token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
