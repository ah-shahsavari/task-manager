"use client"

import { useRouter } from "next/navigation"
import { useTasks } from "../../context/TaskContext"
import TaskForm from "../../components/TaskForm"
import { Task, TaskWithId } from "../../types"

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
      <TaskForm task={task} onSubmit={handleUpdateTask} />
    </div>
  )
}
