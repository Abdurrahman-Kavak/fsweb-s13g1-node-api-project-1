// SUNUCUYU BU DOSYAYA KURUN / SETUP THE SERVER IN THIS FILE
const express = require("express");
const User = require("./users/model");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("API'ye hoş geldiniz!");
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});
server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  } else {
    try {
      const newUser = await User.insert({ name, bio });
      res.status(201).json(newUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.remove(id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  } else {
    try {
      const updatedUser = await User.update(id, { id, name, bio }); // id en başa eklendi / id added to the top
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
    } catch (err) {
      res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
    }
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {} / EXPORT YOUR SERVER {}
