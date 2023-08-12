const { Router } = require("express");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../decorators");
const ctrl = require("../../controllers/auth-controller");
const { authenticate } = require("../../middlewares");

const router = Router();

router.post(
  "/register",
  
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);
// authenticate,
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
