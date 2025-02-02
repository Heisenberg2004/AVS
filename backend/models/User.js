const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {
  create: async (user, callback) => {
    const { fname, lname, studentID, teacherID, email, password, major, role } =
      user;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (fname, lname, studentID, teacherID, email, password, major, role) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fname,
        lname,
        studentID || null,
        teacherID || null,
        email,
        hashedPassword,
        major || null,
        role,
      ],
      callback
    );
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },
};

module.exports = User;
