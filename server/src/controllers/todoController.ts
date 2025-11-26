import { Request, Response } from "express";
import * as TodoService from "../services/todoService";
import { parseCSV } from "../utils/csvParser";
import { parseQuickTodo } from "../services/ChatGPTService";
import { createTodo } from "../services/todoService";

export const create = async (req: Request, res: Response) => {
  try {
    const todo = await TodoService.createTodo(req.userId!, req.body);
    return res.json(todo);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const todos = await TodoService.getTodos(req.userId!);
    return res.json(todos);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const todo = await TodoService.getTodoById(req.userId!, Number(req.params.id));
    return res.json(todo);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updated = await TodoService.updateTodo(
      req.userId!,
      Number(req.params.id),
      req.body
    );
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const response = await TodoService.deleteTodo(
      req.userId!,
      Number(req.params.id)
    );
    return res.json(response);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const bulkUploadTodos = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let items: any[] = [];

    if (req.file.mimetype === "application/json") {
      items = JSON.parse(req.file.buffer.toString());
    } 
    else {
      // CSV
      items = await parseCSV(req.file.buffer);
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "File must contain an array" });
    }

    const data = await TodoService.insertTodos(req.userId!, items);

    return res.json({
      message: "Todos imported successfully",
      imported: data.length,
      todos: data,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createQuickTodo = async (req: Request, res: Response) => {
  const userId = req.userId!;
  const { input } = req.body as { input: string };

  try {
    const aiTodo = await parseQuickTodo(input);

    const newTodo = await createTodo(userId, {
      title: aiTodo.title,
      description: aiTodo.description,
      category: aiTodo.category,
      priority: aiTodo.priority
    });

    return res.status(201).json(newTodo);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "AI Quick Todo failed" });
  }
};
