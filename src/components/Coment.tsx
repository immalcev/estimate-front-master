import style from '../css/style.module.css';
import { CommentData } from './types';

const Coment = (props: CommentData) => {
  const { id, user, comments, taskid } = props;
  return (
    <>
      <div className={style.coment}>
        <div className={style.member_block}>
          <div className={style.staff_circle}>id: {id}</div>
          <div className={style.member_info_mini}>
            <div className={style.member_name}>{user}</div>
          </div>
        </div>
        <div className={style.coment_text}>
          <p>{comments}</p>
        </div>
      </div>
    </>
  );
};

export default Coment