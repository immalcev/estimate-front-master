import classNames from 'classnames';
import style from '../css/style.module.css';
import { PersonData } from './types';

const StaffForCreate = (props: PersonData) => {
  const { id, name, surname, patronymic, onClick, selected } = props;

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  }

  return (
    <>
    <div className={classNames(style.staff, { [style.selected]: selected })} onClick={handleClick}>
      <div className={style.staff_circle}>id: {id}</div>
      <p className={style.staff_name}>{surname} {name} {patronymic}</p>
      {selected && (
        <div className={style.selected_circle}></div>
      )}
    </div>
    </>
  )
}

export default StaffForCreate 