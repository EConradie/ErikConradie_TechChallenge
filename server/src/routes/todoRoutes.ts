import { Router } from "express";
import * as todoController from "../controllers/todoController";
import auth from "../middleware/auth";
import { upload } from "../utils/multerConfig";

const router = Router();

router.post("/", auth, todoController.create);
router.get("/", auth, todoController.getAll);
router.get("/:id", auth, todoController.getOne);
router.put("/:id", auth, todoController.update);
router.delete("/:id", auth, todoController.remove);
router.post(
  "/upload",
  auth,
  upload.single("file"),
  todoController.bulkUploadTodos
);
router.post("/quick-todo", auth, todoController.createQuickTodo);


export default router;
