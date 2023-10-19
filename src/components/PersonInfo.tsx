import style from '../css/style.module.css';
import { PersonData } from './types';




const PersonInfo = (props: PersonData) => {
  const { id, name, surname, patronymic } = props;
  return (
    <>
      <div className={style.staff_circle}>id: {id}</div>
      <div className={style.name}>
        <div className={style.firstname}>{name}</div>
        <div className={style.lastname}>{patronymic}</div>
      </div>
    </>
  )
}
export default PersonInfo