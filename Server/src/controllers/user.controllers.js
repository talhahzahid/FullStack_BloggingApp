
import users from "../models/user.models.js"
import jwt from "jsonwebtoken"
import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from "dotenv";
configDotenv()

const uploadImageToCloudinary = async (localpath) => {
    console.log('Uploading image from path:', localpath);
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto"
        });
        // console.log('Cloudinary upload result:', uploadResult);
        fs.unlinkSync(localpath); // Remove file after upload
        return uploadResult.url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        fs.unlinkSync(localpath); // Remove file after error
        return null;
    }
}

const generateTokenFromUser = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET)
}

const signUp = async (req, res) => {
    const { fullname, email, password } = req.body
    if (!fullname) return res.status(400).json({ message: "Fullname is required" })
    if (!email) return res.status(400).json({ message: "Email is required" })
    if (!password) return res.status(400).json({ message: "Password is required" })
    if (!req.file) return res.status(400).json({ message: "Image is required" })

    try {
        const imageUrl = await uploadImageToCloudinary(req.file.path)
        if (!imageUrl) return res.status(400).json({ message: "Image is required" })
        const userInfo = await users.create({ fullname, email, password, imageUrl })
        res.status(201).json({ message: "Register successfully", userInfo })
    } catch (error) {
        res.status(400).json({ message: "error occure" })
    }
}

// const signIn = async (req, res) => {
//     const { email, password } = req.body
//     if (!email) return res.status(400).json({ message: "Fullname is required" })
//     if (!password) return res.status(400).json({ message: "Fullname is required" })
//     try {
//         const user = await users.findOne({ email })
//         if (user) return res.status(400).json({ message: "User is already exit" })
//         const validatePassword = await bcrypt.compare(user.password, password)
//         if (!validatePassword) return res.status(404).json({ message: "Incorrect password" })
//         const token = generateTokenFromUser(user)
//         res.cookie("Token", token, { httpOnly: true, sameSite: "None", secure: true })
//         res.status(200).json({ message: "login successfully" })
//     } catch (error) {
//         res.status(200).json({ message: "error occurred" })
//     }
// }

export { signUp }