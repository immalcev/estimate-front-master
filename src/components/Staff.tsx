import style from '../css/style.module.css';
import { PersonData } from './types';

const Staff = (props: PersonData) => {
  const { id, name, surname, patronymic } = props;
  return (
    <>
      <div className={style.staff}>
        <div className={style.staff_circle}>id: {id}</div>
        <p className={style.staff_name}>{surname} {name} {patronymic}</p>
      </div>
    </>
  )
}
export default Staff