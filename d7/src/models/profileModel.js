import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
    nickname: String,
    photo: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const ProfileModel = mongoose.model('Profile', profileSchema);

export default ProfileModel;