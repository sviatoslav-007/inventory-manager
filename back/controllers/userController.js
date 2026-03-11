import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email та пароль обов’язкові" });
    }

    const newUser = new User({
      name: email.split("@")[0],
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      user: { id: savedUser._id, email: savedUser.email, name: savedUser.name },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Цей email вже використовується" });
    }
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    res.status(200).json({
      message: "Вхід успішний",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
};
