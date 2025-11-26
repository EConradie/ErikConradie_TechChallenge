import  AppDataSource  from "../dataSource";
import { Todo } from "../entities/Todo";
import { User } from "../entities/User";

const todoRepo = AppDataSource.getRepository(Todo);
const userRepo = AppDataSource.getRepository(User);


const checkUser = async (userId: number): Promise<User> => {
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return user;
}

const checkUserTodo = async (userId: number, todoId: number): Promise<Todo> => {
  const todo = await todoRepo.findOne({ where: { id: todoId, user: { id: userId } } });
  if (!todo) throw new Error("Todo not found");

  return todo;
}

export const createTodo = async (userId: number, data: any) => {
  
  const user = await checkUser(userId);

  const todo = todoRepo.create({
    title: data.title,
    description: data.description,
    status: data.status || "pending",
    category: data.category || "General",
    priority: data.priority || "Low",
    user: user
  });

  await todoRepo.save(todo);
  return todo;
};

export const getTodos = async (userId: number) => {

  await checkUser (userId);

  return await todoRepo.find({
    where: { user: { id: userId } },
    order: { created_at: "DESC" }
  });
};

export const getTodoById = async (userId: number, todoId: number) => {
  return await checkUserTodo(userId, todoId);
};

export const updateTodo = async (userId: number, todoId: number, data: any) => {

  const todo = await checkUserTodo(userId, todoId);

  todo.title = data.title ?? todo.title;
  todo.description = data.description ?? todo.description;
  todo.status = data.status ?? todo.status;

  await todoRepo.save(todo);
  return todo;
};

export const deleteTodo = async (userId: number, todoId: number) => {
  
  const todo = await checkUserTodo(userId, todoId);

  await todoRepo.remove(todo);

  return { message: "Todo deleted successfully" };
};

export const insertTodos = async (userId: number, items: any[]) => {

  const user = await checkUser(userId);

  const todos = items.map(item => {
    const todo = new Todo();
    todo.title = item.title;
    todo.description = item.description || ""
    todo.status = item.status || "pending";
    todo.category = item.category || "General";
    todo.priority = item.priority || "Low";
    todo.user = user;
    return todo;
  });

  return await todoRepo.save(todos);
};
