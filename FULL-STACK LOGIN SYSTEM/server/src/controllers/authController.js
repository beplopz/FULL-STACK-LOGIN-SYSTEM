import bcrypt from "bcryptjs";
import User from "../models/User.js";

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
}

export async function registerUser(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Name, email, and password are required."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).json({
        message: "A user with that email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json({
      message: "Account created successfully.",
      user: sanitizeUser(user)
    });
  } catch (error) {
    return response.status(500).json({
      message: "Could not register user.",
      error: error.message
    });
  }
}

export async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return response.status(401).json({
        message: "Invalid email or password."
      });
    }

    return response.status(200).json({
      message: "Login successful.",
      user: sanitizeUser(user)
    });
  } catch (error) {
    return response.status(500).json({
      message: "Could not log in.",
      error: error.message
    });
  }
}
