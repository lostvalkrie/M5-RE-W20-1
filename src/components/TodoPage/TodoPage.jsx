import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { addTodo, getTodosThunk } from "../../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import MapTasks from "./MapTasks/MapTasks";
import { useEffect } from "react";
import classNames from "classnames";
import styles from "./TodoPage.module.scss";

const TaskSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Занадто коротке завдання (мінімум 3 символи)")
    .required("Обов'язкове поле"),
});

function TodoPage() {
  const { todos, isFetching, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: values.title,
      completed: false,
    };

    dispatch(addTodo(newTask));
    resetForm();
  };

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>Мої завдання</h2>

      <Formik
        initialValues={{ title: "" }}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          const titleClassNames = classNames(styles.input, {
            [styles.errorInput]: errors.title && touched.title,
          });

          return (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <Field
                  name="title"
                  placeholder="Що треба зробити?"
                  className={titleClassNames}
                />
                <ErrorMessage
                  name="title"
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
        {isFetching && <p>Fetching...</p>}
        {error && <p>Error while loading!</p>}
        {todos.map((task) => (
          <MapTasks key={task.id} task={task} />
        ))}
      </ul>
    </article>
  );
}

export default TodoPage;
