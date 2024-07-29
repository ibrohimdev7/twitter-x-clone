import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    username: String,
    coverImage: String,
    profileImage: String,
    bio: String,
    location: String,
    createdAt: Date,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
