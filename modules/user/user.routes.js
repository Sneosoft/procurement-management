const { Router } = require("express");
module.exports = class UserRoutes {
  constructor({ userController }) {
    this.getUser = userController.getUser;
    this.createUser = userController.createUser;
    this.updateUser = userController.updateUser;
    this.deleteUser = userController.deleteUser;
    this.assignReporting = userController.assignReporting;
  }

  userRouter = () => {
    const routes = Router();
    routes.get("/", this.getUser);
    routes.post("/", this.createUser);
    routes.put("/", this.updateUser);
    routes.delete("/", this.deleteUser);
    routes.put("/assign", this.assignReporting);
    return routes;
  };
};
/**
 * @swagger
 * tags:
 *   name: Sample
 *   description: Sample route
 */

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Get a sample message
 *     tags: [Sample]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Sample message
 */
