import { Router } from "express"
import { getAllMenuItems, getMenuItemById } from "../controllers/menuController.js"

const router = Router();

router.get('/', getAllMenuItems)
router.get('/:id', getMenuItemById)

export default router;
