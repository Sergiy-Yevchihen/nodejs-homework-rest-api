const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const { schemas } = require("../../models/contact");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  ctrl.addContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
