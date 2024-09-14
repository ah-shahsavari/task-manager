"use client"

import { useTasks } from "./context/TaskContext"
import Link from "next/link"
import styles from "./styles/TaskTable.module.scss"

export default function Home() {
  const { tasks, removeTask } = useTasks()

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      removeTask(id)
    }
  }

  return (
    <div>
      <h1>Task List</h1>
      {tasks.length > 0 ? (
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={
                  task.completed ? styles.completed : styles.inProgress
                }
              >
                <td>{task.title}</td>
                <td>
                  {task.description.length > 100
                    ? `${task.description.slice(0, 100)}...`
                    : task.description}
                </td>
                <td>{task.completed ? "Completed" : "In Progress"}</td>
                <td>
                  <Link href={`/task/${task.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noTasks}>
          "There are no tasks to display. You can add your tasks using the
          <strong> button</strong> below."
        </p>
      )}
      <Link href="/task/add" className={styles.addTask}>
        Add New Task
      </Link>
    </div>
  )
}
