
"use client"
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

interface TaskContextProps {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: number, updatedTask: Task) => void
  removeTask: (id: number) => void
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined)

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const updateTask = (id: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    )
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}
