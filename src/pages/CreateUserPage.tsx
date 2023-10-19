import classNames from 'classnames';
import style from '../css/style.module.css';
import Menu from '../components/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { UserData } from '../components/types';
import { Base_URL } from '../baseUrl';

const CreateUserPage: React.FC = (props: any) => {
  const [maxId, setMaxId] = useState<number>(0);
  const [users, setUsers] = useState<UserData[]>([]);
  const [lastUserId, setLastUserId] = useState<number>(0);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate()

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  }


  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}User`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const usersIds = response.data.map((user: { personId: number }) => user.personId + 1);
      const maxId = Math.max(...usersIds);
      setUsers(response.data[maxId]);
      console.log(maxId);
      setMaxId(maxId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPersons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}person`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const usersIds = response.data.map((person: { id: number }) => person.id + 1);
      const maxId = Math.max(...usersIds);
      setUsers(response.data[maxId]);
      console.log(maxId);
      setMaxId(maxId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPersons();
  }, []);

  const onSubmit = async (values: any) => {
    const UserToSubmit = {
      login: values.login,
      password: values.password,
    };

    const PersonToSubmit = {
      name: values.name,
      surname: values.surname,
      patronymic: values.patronymic,
    };

    try {
      const token = localStorage.getItem('token');
      const responseUser = await axios.post(
        `${Base_URL}register`,
        UserToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const responsePerson = await axios.put(
        `${Base_URL}person/${maxId}`,
        PersonToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      await fetchUsers();
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  const formikUser = useFormik({
    initialValues: {
      login: "",
      password: "",
      name: "",
      surname: "",
      patronymic: "",
    },
    onSubmit,
  });


  const onSubmitPerson = async (values: any) => {

    const PersonToSubmit = {
      name: values.name,
      surname: values.surname,
      patronymic: values.patronymic,
    };

    try {
      const token = localStorage.getItem('token');
      const responseUser = await axios.post(
        `${Base_URL}person`,
        PersonToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      await fetchPersons();
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };


  const formikPerson = useFormik({
    initialValues: {
      name: "",
      surname: "",
      patronymic: "",
    },
    onSubmit: onSubmitPerson,
  });

  return (
    <>
      <Menu>
        <NavLink to='/' className={classNames(style.option, style.back)}>
          <div className={classNames(style.options_icon, style.back_icon)}></div>
          <span className={style.option_name}>Вернуться</span>
        </NavLink>
      </Menu>
      <main>
        <div className={style.project_title_block}>
          <div className={style.project_title}>
            Новый 
            <button className={style.switch_btn} onClick={toggleForm}>{showForm ? (<>Пользователь</>) : (<>Исполнитель</>)}
              <div className={classNames(style.options_icon, style.switch_person_user_icon)}>
              </div>
            </button>
          </div>
        </div>
        <section>
      
        {showForm ? (
          <form className={style.login_form} id='formUser' onSubmit={formikUser.handleSubmit}>
            <div className={style.login_inputs}>
              <input
                className={style.login_input}
                type="text"
                id="login"
                placeholder='Логин'
                value={formikUser.values.login}
                onChange={formikUser.handleChange}
              />
              <input
                className={style.login_input}
                type="password"
                id="password"
                placeholder='Пароль'
                value={formikUser.values.password}
                onChange={formikUser.handleChange}
              />
              <input
                className={style.login_input}
                type="text"
                id="surname"
                placeholder='Фамилия'
                value={formikUser.values.surname}
                onChange={formikUser.handleChange}
              />
              <input
                className={style.login_input}
                type="text"
                id="name"
                placeholder='Имя'
                value={formikUser.values.name}
                onChange={formikUser.handleChange}
              />
              <input
                className={style.login_input}
                type="text"
                id="patronymic"
                placeholder='Отчество'
                value={formikUser.values.patronymic}
                onChange={formikUser.handleChange}
              />
            </div>
            <button className={style.login_button} disabled={formikUser.isSubmitting} type="submit">
              Создать
            </button>
          </form>
          ) : (
          <form className={style.login_form} id='formPerson' onSubmit={formikPerson.handleSubmit}>
            <div className={style.login_inputs}>
              <input
                className={style.login_input}
                type="text"
                id="surname"
                placeholder='Фамилия'
                value={formikPerson.values.surname}
                onChange={formikPerson.handleChange}
              />
              <input
                className={style.login_input}
                type="text"
                id="name"
                placeholder='Имя'
                value={formikPerson.values.name}
                onChange={formikPerson.handleChange}
              />
              <input
                className={style.login_input}
                type="text"
                id="patronymic"
                placeholder='Отчество'
                value={formikPerson.values.patronymic}
                onChange={formikPerson.handleChange}
              />
            </div>
            <button className={style.login_button} disabled={formikPerson.isSubmitting} type="submit">
              Создать
            </button>
          </form>
           )}
        </section>
      </main>
    </>
  );
};

export default CreateUserPage;