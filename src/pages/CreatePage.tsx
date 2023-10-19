import classNames from 'classnames';
import style from '../css/style.module.css';
import Menu from '../components/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import StaffForCreate from '../components/StaffForCreate';
import { useEffect, useState } from 'react';
import { PersonData, ProjectData } from '../components/types';
import { Base_URL } from '../baseUrl';

function CreatePage() {
  const navigate = useNavigate();
  const [maxId, setMaxId] = useState<number>(0);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [persons, setPersons] = useState<PersonData[]>([]);
  const [users, setUsers] = useState<PersonData[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<number[]>([]);
  const [selectedPersonsActivities, setSelectedPersonsActivities] = useState<{ [key: number]: number }>({});
  const [availableActivities, setAvailableActivities] = useState<{ id: number, name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}task`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // setProjects(Math.max(response.data.project{}));
      const projectsIds = response.data.map((project: { id: number }) => project.id
       + 1

       
       );
      const maxId = Math.max(...projectsIds);
      setProjects(response.data[maxId]);
      setMaxId(maxId);
      console.log(maxId);
      return maxId;
    } catch (error) {
      console.error('Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}person/only`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setPersons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersons();
  }, []);


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}person/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersons();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}type_of_activity`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
        setAvailableActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchActivities();
  }, []);

  const handlePersonClick = (id: number) => {
    if (selectedPersons.includes(id)) {
      setSelectedPersons((prev) => prev.filter((p) => p !== id));
    } else {
      setSelectedPersons((prev) => [...prev, id]);
    }
  };

  const CreateTask = async (values: any) => {
    console.log("Values: ", values);

    try {
      const token = localStorage.getItem('token');

      const newTask = `${Base_URL}task`;

      const responseUser = await axios.post(
        newTask,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

// присвоение персонов и юзеров

  const handleSubmit = async (maxId: number) => {
    try {
      const token = localStorage.getItem('token');

      await Promise.all(
        selectedPersons.map((id) =>
          axios.post(
            `${Base_URL}user-role-project`,
            {
              userid: id,
              // roleid: 1,
              projectid: maxId,
              // type_of_activityid: selectedPersonsActivities[id],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      console.log('Tasks have been assigned');
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

// подтверждение формы

  const handleAssignTasks = async (values: { name: string; }) => {
    try {
      await Promise.all([
        await CreateTask(values),
        await fetchData(),
        await handleSubmit(maxId),
      ])

      console.log('Tasks have been assigned');
    } catch (error) {
      console.error(error);
    }
  };

  const formikTask = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      if (!isLoading) {  // блокировка отправки формы
        handleAssignTasks(values);
      }
    },
  });


  useEffect(() => {
    fetchData();
    console.log('maxId changed:', maxId);
  }, [maxId]);

  return (
    <>
      <Menu>
        <NavLink to='/' className={classNames(style.option, style.back)}><div className={classNames(style.options_icon, style.back_icon)}></div><span className={style.option_name}>Вернуться</span></NavLink>
      </Menu>

      <main>
        <div className={style.project_title_block}>
          <h2 className={style.project_title}>Создание Проекта</h2>
        </div>
        <form className={style.create_form} method='post' 
        onSubmit={formikTask.handleSubmit}
        >
          <div className={style.create_content}>
            <div className={style.form_block}>
              <input className={style.login_input} type="text" placeholder='Название' min="4"
                id="name"
                value={formikTask.values.name}
                onChange={formikTask.handleChange} />
            </div>
            <h2 className={style.title_white} > Исполнители : </h2>
            <section className={style.staff_list}>
              {persons.map((person) => (
                <StaffForCreate
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  surname={person.surname}
                  patronymic={person.patronymic}
                  onClick={() => handlePersonClick(person.id)}
                  selected={selectedPersons.includes(person.id)}
                />
              ))}
            </section>
            <h2 className={style.title_white} > Пользователи : </h2>
            <section className={style.staff_list}>
              {users.map((person) => (
                <StaffForCreate
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  surname={person.surname}
                  patronymic={person.patronymic}
                  onClick={() => handlePersonClick(person.id)}
                  selected={selectedPersons.includes(person.id)}
                />
              ))}
            </section>
          </div>
          <div className={style.create_option_block}>
            <button
            //  onClick={handleAssignTasks}
              className={classNames(style.modal_option, style.modal_option_blue)}
              disabled={formikTask.isSubmitting || selectedPersons.length == 0}
              type="submit">
              Добавить
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreatePage;