import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.address = req.body.address !== undefined ? req.body.address : user.address;
            user.phoneNumber = req.body.phoneNumber !== undefined ? req.body.phoneNumber : user.phoneNumber;

            // Check if email already exists
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await User.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ success: false, message: "Email already in use" });
                }
                user.email = req.body.email;
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                success: true,
                user: {
                    _id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image,
                    address: updatedUser.address,
                    phoneNumber: updatedUser.phoneNumber,
                },
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
