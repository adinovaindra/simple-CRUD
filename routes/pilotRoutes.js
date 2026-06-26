const express = require("express");
const authenticationToken = require("../middleware");
const {
  getAllPilot,
  getPilotById,
  addPilot,
  editPilot,
  deletePilot,
} = require("../controllers/pilotController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pilot
 *   description: Pilot management endpoints
 */

/**
 * @swagger
 * /pilot:
 *   get:
 *     summary: Get all pilots
 *     tags: [Pilot]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all pilots
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticationToken, getAllPilot);

/**
 * @swagger
 * /pilot/{id}:
 *   get:
 *     summary: Get pilot by ID
 *     tags: [Pilot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pilot found
 *       404:
 *         description: Pilot not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticationToken, getPilotById);

/**
 * @swagger
 * /pilot:
 *   post:
 *     summary: Add a new pilot
 *     tags: [Pilot]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - jamTerbang
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Dino
 *               jamTerbang:
 *                 type: integer
 *                 example: 1200
 *     responses:
 *       201:
 *         description: Pilot added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticationToken, addPilot);

/**
 * @swagger
 * /pilot/{id}:
 *   put:
 *     summary: Update pilot by ID
 *     tags: [Pilot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Dino Updated
 *               jamTerbang:
 *                 type: integer
 *                 example: 1500
 *     responses:
 *       200:
 *         description: Pilot updated successfully
 *       404:
 *         description: Pilot not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticationToken, editPilot);

/**
 * @swagger
 * /pilot/{id}:
 *   delete:
 *     summary: Delete pilot by ID
 *     tags: [Pilot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pilot deleted successfully
 *       404:
 *         description: Pilot not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticationToken, deletePilot);

module.exports = router;