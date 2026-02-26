import { Router } from "express"
import { addItemToStock, getAllMenuItems, getMenuItemById } from "../controllers/menuController.js"
import { authorizeAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', getAllMenuItems)
router.get('/:id', getMenuItemById)

router.post('/', protectRoute, authorizeAdmin, addItemToStock)

export default router;
