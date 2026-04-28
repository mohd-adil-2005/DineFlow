import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import {} from 'express';
import 'dotenv/config';
import TryCatch from '../middlewares/tryCatch.js';
import { GOOGLE_REDIRECT_URI, oauth2Client } from '../config/googleConfig.js';
import axios from 'axios';
export const loginUser = TryCatch(async (req, res) => {
    const { code, redirectUri, accessToken } = req.body;
    let googleAccessToken = accessToken;
    if (!googleAccessToken) {
        if (!code) {
            return res.status(400).json({
                message: "Authorization code or access token is required"
            });
        }
        let googleRes;
        try {
            googleRes = await oauth2Client.getToken({
                code,
                redirect_uri: redirectUri || GOOGLE_REDIRECT_URI,
            });
        }
        catch (error) {
            return res.status(401).json({
                message: "Invalid or expired Google authorization code",
                details: axios.isAxiosError(error) ? error.response?.data : undefined,
            });
        }
        googleAccessToken = googleRes.tokens.access_token ?? undefined;
        if (!googleAccessToken) {
            return res.status(401).json({ message: "Google access token is missing" });
        }
    }
    let userRes;
    try {
        userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo?alt=json", { headers: { Authorization: `Bearer ${googleAccessToken}` } });
    }
    catch (error) {
        return res.status(401).json({
            message: "Unable to fetch Google user profile",
            details: axios.isAxiosError(error) ? error.response?.data : undefined,
        });
    }
    const { email, name, picture } = userRes.data;
    if (!email || !name || !picture) {
        return res.status(400).json({ message: "Missing fields" });
    }
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            email,
            name,
            image: picture,
        });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret is not configured" });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "2h" });
    res.status(200).json({ message: "login Success", token, user });
});
const allowedRoles = ["customer", "rider", "seller"];
export const AdduserRole = TryCatch(async (req, res) => {
    if (!req?.user?._id) {
        return res.status(401).json({ message: "Unauthorized User", id: req?.user?._id });
    }
    const { role } = req.body;
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "invalid role" });
    }
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret is not configured" });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "2h" });
    res.status(200).json({ message: "User role updated successfully", user, token });
});
export const myprofile = TryCatch(async (req, res) => {
    if (!req?.user?._id) {
        return res.status(401).json({ message: "token is not valid" });
    }
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User profile fetched successfully", user });
});
