const { Router } = require("express");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../decorators");
const ctrl = require("../../controllers/auth-controller");
const { authenticate, checkBody, upload } = require("../../middlewares");

const router = Router();

router.post(
  "/register",
  checkBody,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  ctrl.repeatEmailVerify
);

router.post("/login", checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
