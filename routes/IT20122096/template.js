const express = require("express");
const auth = require("../../middleware/auth");
const IsAdmin = require("../../middleware/IsAdmin");
const { Template } = require("../../models/IT20122096/Templates");
const router = express.Router();
const cloudinary = require("../../utils/cloudinary");
const multer = require("../../utils/multer");

router.post("/:name",[auth, IsAdmin, multer.single("template")],async (req, res) => {
    try {
      let result = "";
      const fileType = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];
      if (fileType.includes(req.file.mimetype)) {
        result = await cloudinary.uploader.upload(req.file.path, {
          public_id: req.file.originalname,
          resource_type: "raw",
          raw_convert: "aspose",
        });
      } else {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const template = new Template({
        type: req.params.name,
        file: result.url,
      });
      await template.save();
      res.send(template);
    } catch (error) {
      console.error(error);
    }
  }
);

router.get("/",[auth], async (req, res) => {
  const templates = await Template.find();
  if (templates.length===0) return res.status(400).send("No templates found");
  res.send(templates);
})
router.delete("/:id",[auth,IsAdmin], async (req, res) => {
  const templates = await Template.findByIdAndDelete(req.params.id);
  if (!templates) return res.status(400).send("No templates found");
  res.send(templates);
});

module.exports = router;
