import express from "express";
import { addToCart, checkCartItems, toggleCart , updateCart, removeFromCart} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", checkCartItems);
router.post("/toggle", toggleCart);
router.put("/update", updateCart);
router.delete("/remove", removeFromCart);

export default router;