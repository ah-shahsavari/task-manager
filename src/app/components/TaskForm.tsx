import { useForm } from "react-hook-form"
import styles from "../styles/TaskForm.module.scss"

interface Task {
  title: string
  description: string
  completed: boolean
}

interface TaskFormProps {
  task?: Task
  onSubmit: (task: Task) => void
}

export default function TaskForm({ task, onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: task || {
      title: "",
      description: "",
      completed: false,
    },
  })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
    
  })

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <label>Title</label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>Title is required</span>}

      <label>Description</label>
      <textarea {...register("description")} />

      <label>Status</label>
      <select {...register("completed")}>
        <option value={false}>In Progress</option>
        <option value={true}>Completed</option>
      </select>

      <button type="submit">Save Task</button>
    </form>
  )
}
