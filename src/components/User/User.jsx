import { useEffect } from "react";
import { getUserThunk } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./User.module.scss";
const User = () => {
  const { user, isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.div}>
      {isFetching && <div>Loading...</div>}
      {error && <div>Unknown Error</div>}
      {!isFetching && !error && (
        <>
          <img src={user?.picture.medium} alt="pfp" className={styles.pfp} />
          <p>{`${user?.name.first} ${user?.name.last}`}</p>
        </>
      )}
    </div>
  );
};

export default User;
