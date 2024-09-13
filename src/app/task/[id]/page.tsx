"use client"

import { useRouter } from "next/navigation"
import { useTasks } from "../../context/TaskContext"
import TaskForm from "../../components/TaskForm"
import Link from "next/link"

export default function TaskDetails({ params }: { params: { id: string } }) {
  const { tasks, updateTask } = useTasks()
  const task = tasks.find((task) => task.id === Number(params.id))

  const router = useRouter()

  if (!task) {
    return <div>Task not found</div>
  }

  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(Number(params.id), updatedTask)
    router.push("/") // هدایت به صفحه لیست تسک‌ها بعد از ویرایش
  }

  return (
    <div>
      <div className="header-bar">
        <h1>Task Details</h1>
        <Link href={'/'}>back</Link>
      </div>
      <TaskForm task={task} onSubmit={handleUpdateTask} />
    </div>
  )
}
