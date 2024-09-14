"use client"

import { useRouter } from "next/navigation"
import { useTasks } from "../../context/TaskContext"
import TaskForm from "../../components/TaskForm"
import { Task, TaskWithId } from "../../types"
import Link from "next/link"

export default function TaskDetails({ params }: { params: { id: string } }) {
  const { tasks, updateTask } = useTasks()
  const task = tasks.find((task) => task.id === Number(params.id))

  const router = useRouter()

  if (!task) {
    return <div>Task not found</div>
  }

  const handleUpdateTask = (updatedTask: Task) => {
    const taskWithId: TaskWithId = { ...updatedTask, id: Number(params.id) }
    updateTask(taskWithId.id, taskWithId)
    router.push("/")
  }

  return (
    <div>
      <div className="header-bar">
        <h1> Edit Task</h1>
        <Link href={"/"}>back</Link>
      </div>

      <TaskForm task={task} onSubmit={handleUpdateTask} />
    </div>
  )
}
