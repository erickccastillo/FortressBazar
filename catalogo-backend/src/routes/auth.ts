// src/routes/auth.ts

import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: true,
      token: "admin-authenticated"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Credenciales incorrectas"
  });
});

export default router;
