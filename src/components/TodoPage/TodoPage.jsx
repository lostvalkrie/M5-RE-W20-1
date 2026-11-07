import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import classNames from "classnames";
import styles from "./TodoPage.module.scss";
import { addTodo, deleteTodo, toggleTodo } from "../../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Занадто коротке завдання (мінімум 3 символи)")
    .required("Обов'язкове поле"),
  deadline: yup.date().required("Вкажіть дедлайн"),
});

function TodoPage() {
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: values.title,
      completed: false,
      deadline: values.deadline,
    };

    dispatch(addTodo(newTask));
    resetForm();
  };

  const isOverdue = (deadline, completed) => {
    if (completed) {
      return false;
    }
    return new Date(deadline) < new Date();
  };

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>Мої завдання</h2>

      <Formik
        initialValues={{ title: "", deadline: "" }}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          const bodyClassNames = classNames(styles.input, {
            [styles.errorInput]: errors.body && touched.body,
          });
          const deadlineClassNames = classNames(styles.input, {
            [styles.errorInput]: errors.deadline && touched.deadline,
          });

          return (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <Field
                  name="body"
                  placeholder="Що треба зробити?"
                  className={bodyClassNames}
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>

              <div className={styles.fieldGroup}>
                <Field
                  type="date"
                  name="deadline"
                  className={deadlineClassNames}
                />
                <ErrorMessage
                  name="deadline"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Додати завдання
              </button>
            </Form>
          );
        }}
      </Formik>

      <ul className={styles.list}>
        {tasks.map((task) => {
          const overdue = isOverdue(task.deadline, task.completed);

          const taskClassNames = classNames(styles.item, {
            [styles.done]: task.completed,
            [styles.overdue]: overdue,
          });
          const bodyClassNames = classNames(styles.taskText, {
            [styles.taskTextDone]: task.completed,
          });
          const deadlineClassNames = classNames(styles.taskDeadline, {
            [styles.deadlineOverdue]: overdue,
          });

          return (
            <li key={task.id} className={taskClassNames}>
              <div className={styles.taskInfo}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => dispatch(toggleTodo(task.id))}
                />
                <span className={bodyClassNames}>{task.body}</span>
                <span className={deadlineClassNames}>({task.deadline})</span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => dispatch(deleteTodo(task.id))}
              >
                Видалити
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default TodoPage;
