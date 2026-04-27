import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Theme } from "@/server/dtos/UserDTOs/user.dto";

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  theme: Theme;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.models.User ?? mongoose.model<UserDocument>("User", UserSchema);

export default User;