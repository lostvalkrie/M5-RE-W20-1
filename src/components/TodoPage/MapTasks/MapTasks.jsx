import classNames from "classnames";
import { deleteTodo, toggleTodo } from "../../../store/slices/todoSlice";
import styles from "../TodoPage.module.scss";
import { useDispatch } from "react-redux";

const MapTasks = ({ task }) => {
  const dispatch = useDispatch();

  const taskClassNames = classNames(styles.item, {
    [styles.done]: task.completed,
  });
  const titleClassNames = classNames(styles.taskText, {
    [styles.taskTextDone]: task.completed,
  });

  return (
    <li className={taskClassNames}>
      <div className={styles.taskInfo}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          onChange={() => dispatch(toggleTodo(task.id))}
        />
        <span className={titleClassNames}>{task.title}</span>
      </div>

      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteTodo(task.id))}
      >
        Видалити
      </button>
    </li>
  );
};

export default MapTasks;
