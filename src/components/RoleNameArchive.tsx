import style from '../css/style.module.css';

const RoleNameArchive = () => {
  return (
    <>
      <div className={style.role_archive_block}>
        <p className={style.role_names}>Добавить</p>
        <div className={style.role_name_block}>
          <p className={style.role_name}>Менеджер</p>
          <p className={style.role_name}>Комментатор</p>
          <p className={style.role_name}>Комментатор</p>
          <p className={style.role_name}>Комментатор</p>
        </div>
      </div>
    </>
  )
}

export default RoleNameArchive