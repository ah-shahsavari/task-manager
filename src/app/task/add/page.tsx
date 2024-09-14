"use client"
import { Task } from "../../types"
import Link from "next/link"
import TaskForm from "../../components/TaskForm"
import { useTasks } from "../../context/TaskContext"
import { useRouter } from "next/navigation"

export default function AddTask() {
  const { addTask } = useTasks()
  const router = useRouter()

  const handleAddTask = (task: Task) => {
    addTask({ ...task, id: Date.now() })
    router.push("/")
  }

  return (
    <div>
      <div className="header-bar">
        <h1>Add New Task</h1>
        <Link href={"/"}>back</Link>
      </div>

      <TaskForm onSubmit={handleAddTask} />
    </div>
  )
}
