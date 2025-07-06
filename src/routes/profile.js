const express = require("express");
const { authorized } = require("../middleware/auth");

const router = express.Router();

router.get("/profile/view", authorized, async (req, res) => {
  try {
    const user = res.user;
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.send(userWithoutPassword);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
});

module.exports = router;
