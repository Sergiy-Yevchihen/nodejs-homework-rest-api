const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const { schemas } = require("../../models/contact");
const { validateBody } = require("../../decorators");
const { isValidId, checkBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);


router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  checkBody,
  validateBody(schemas.contactAddSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  checkBody,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
