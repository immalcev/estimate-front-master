import classNames from 'classnames';
import style from '../css/style.module.css';
import Menu from '../components/Menu';
import { NavLink } from 'react-router-dom';
import StaffList from '../components/StaffList';
import UsersList from '../components/UsersList';
import { useState } from 'react';

function StaffPage() {

  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  }


  return (
    <>
      <Menu>
        <NavLink to='/' className={classNames(style.option, style.back)}><div className={classNames(style.options_icon, style.back_icon)}></div><span className={style.option_name}>Вернуться</span></NavLink>
      </Menu>
      <main>
        <div className={style.project_title_block}>
          <div className={style.project_title}>Справочник <button className={style.switch_btn} onClick={toggleForm}>{showForm ? (<>Исполнителей</>) : (<>Пользователей</>)}
              <div className={classNames(style.options_icon, style.switch_person_user_icon)}>
              </div>
            </button></div>
        </div>
        <section className={style.staff_list}>
          {showForm ? (
          <StaffList />
          ) : (
          <UsersList />
          )
          }
        </section>
      </main>
    </>
  );
}

export default StaffPage