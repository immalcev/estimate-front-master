import style from '../css/style.module.css';

const RoleName = () => {
  return (
    <>
      <div className={style.role_block}>
        <p className={style.role_names}>Роли</p>
        <div className={style.role_name_block}>
          <p className={style.role_name}>Менеджер</p>
          <p className={style.role_name}>Комментатор</p>
        </div>
      </div>
    </>
  )
}

export default RoleName