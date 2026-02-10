import { useState } from "react";
import api from '../utils/api';

export const useTasks = () => {
  const [filter, setFilter] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/tasks");
      setTodoList(response.data.data);
    } catch (error) {
      throw new Error("failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };
  const getFilteredList = () => {
    if (filter === "all") return todoList;
    if (filter === "ongoing") return todoList.filter(item => !item.isComplete);
    if (filter === "completed") return todoList.filter(item => item.isComplete);
    return todoList;
  }
  const addTask = async () => {
    if (!todoValue) return;
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });

      if (response.status === 200) {
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);

      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("failed to delete the task");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const toggleComplete = async (item) => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isComplete: !item.isComplete,
      });

      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("failed to update the task");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    filter,
    setFilter,
    todoList: getFilteredList(),
    todoValue,
    isLoading,
    setTodoValue,
    getTasks,
    addTask,
    deleteTask,
    toggleComplete,
  }
};
