import classNames from 'classnames';
import style from '../css/style.module.css';
import Menu from '../components/Menu';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import RoleName from '../components/RoleName';
import RoleNameArchive from '../components/RoleNameArchive';
import MemberAccount from '../components/MemberAccount';
import { CommentData, PersonData, ProjectData } from '../components/types';
import ProjectMini from '../components/ProjectMini';
import Staff from '../components/StaffForCreate';
import axios from 'axios';
import { useFormik } from 'formik';
import CommentsList from '../components/CommentsList';
import { Base_URL } from '../baseUrl';

interface ProjectPageProps {
  projects: ProjectData[];
  project: ProjectData[],
}

const ProjectPage: React.FC<ProjectPageProps> = () => {
  const [persons, setPersons] = useState<PersonData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [newproject, setNewProject] = useState<ProjectData[]>([]);
  const [mainProject, setmainProject] = useState<ProjectData[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [person, setPerson] = useState<PersonData | null>(null);
  const [idSingle, setIdSingle] = useState<number | null>(null);
  const [exele, setExele] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const { id, parent } = useParams();

  useEffect(() => {
    const fetchDownTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}task/downtask/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setProjects(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDownTasks();
  }, [id]);

  useEffect(() => {
    const fetchMainInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}task/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });


        setmainProject(response.data);
        setProjectName(response.data.name);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMainInfo();
  }, [id]);

  const onSubmitCreate = async (values: any) => {
    console.log("Values: ", values);

    const newTaskProps = {
      name: values.name,
      scope: values.scope,
      parent: Number(id),
    };

    try {
      const token = localStorage.getItem('token');

      const newTask = `${Base_URL}task/${id}`;

      const response = await axios.post(
        newTask,
        newTaskProps,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const newProjects = [...projects, response.data];
      setProjects(newProjects);
      handleCloseModal()
    } catch (error) {
      console.error(error);
    }
  };

  const formikTask = useFormik({
    initialValues: {
      name: "",
      scope: "",
      parent: Number(id) ,
    },
    onSubmit: onSubmitCreate,
  });

  const onSubmitDelete = async (values: any) => {
    console.log("Values: ", values);

    try {
      const token = localStorage.getItem('token');

      const DeleteTask = `${Base_URL}task/${id}`;

      const responseUser = await axios.delete(
        DeleteTask,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }

      );
      handleCloseModal()
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}person/single`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setPerson(response.data);
        setIdSingle(response.data.id);
        console.log("idSingle: ", idSingle);
      } catch (error) {
        console.error('Request failed');
      }
    };

    fetchData();
  }, []);

  console.log("idSingle: ", idSingle);
  console.log("id: ", id);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get(`${Base_URL}user-role-project/excel`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       setExele(response.data)
  //       console.log("idSingle: ", idSingle);
  //     } catch (error) {
  //       console.error('Request failed');
  //     }
  //   };

  //   fetchData();
  // }, []);


  const onSubmitComment = async (values: any) => {
    console.log("Values: ", values);

    const CommentToSubmit = {
      user: Number(idSingle),
      comments: values.comments,
      taskid: Number(id),


    };

    try {
      const token = localStorage.getItem('token');

      const newComment = `${Base_URL}comment`;

      const responseComment = await axios.post(
        newComment,
        CommentToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setComments(responseComment.data);
    } catch (error) {
      console.error(error);
    }
  };




  const formikComment = useFormik({
    initialValues: {
      comments: "",
    },
    onSubmit: onSubmitComment,
  });

  useEffect(() => {
    const request = new XMLHttpRequest();
    const token = localStorage.getItem('token');
    request.open('GET', `${Base_URL}user-role-project/persons/${id}`);
    request.setRequestHeader('Content-Type', `application/json`)
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.onload = () => {
      if (request.status === 200) {
        console.log(request.responseText);
        setPersons(JSON.parse(request.responseText));

      } else {
        console.error('Request failed');
      }
    };
    request.send();
  }, []);



  
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showdeleteProjectModal, setshowdeleteProjectModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState<boolean>(false);
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);

  const handleMemberClick = () => {
    setShowMemberModal(true);
  };

  const handleMembersClick = () => {
    setShowMembersModal(true);
  };

  const handleDeleteClick = () => {
    setshowdeleteProjectModal(true);
  };

  const handleCommentsClick = () => {
    setShowCommentsModal(true);
  };

  const handleCreateProjectModal = () => {
    setShowCreateTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowMembersModal(false);
    setshowdeleteProjectModal(false);
    setShowCreateTaskModal(false);
    setShowMemberModal(false);
    setShowCommentsModal(false);

  };

  return (
    <>
      {showMembersModal && (
        <Modal
          title="Список участников"
          onClose={() => setShowMembersModal(false)}>
          <section  className={classNames(style.staff_list, style.modal_list)}>

            {persons.map((person) => (
              <Staff
                key={person.id}
                id={person.id}
                name={person.name}
                surname={person.surname}
                patronymic={person.patronymic}
              />
            ))}

          </section>
          <div className={style.modal_options_block}>
            <div
              className={classNames(style.modal_option, style.modal_option_no)}
              onClick={handleCloseModal}
            >
              Закрыть
            </div>
            <NavLink to='/StaffPage'
              className={classNames(style.modal_option, style.modal_option_yes)}
              onClick={handleCloseModal}
            >
              Добавать участников
            </NavLink>
          </div>
        </Modal>
      )}

      {showCommentsModal && (
        <Modal
          title="Комментарии"
          onClose={() => setShowCommentsModal(false)}>
          <div className={style.task_coment_content}>
            <form className={style.comment_form} onSubmit={formikComment.handleSubmit}>
              <input
                placeholder='Пишите...'
                type="text"
                name="comments"
                className={style.coment_input}
                value={formikComment.values.comments}
                onChange={formikComment.handleChange}
              />
              <button type='submit' className={style.comment_btn}></button>
            </form>
            <CommentsList />
          </div>
          <div className={style.modal_options_block}>
            <div
              className={classNames(style.modal_option, style.modal_option_no)}
              onClick={handleCloseModal}
            >
              Закрыть
            </div>
          </div>
        </Modal>
      )}

      {showdeleteProjectModal && (
        <Modal title="Удаление Проекта">
          <div>вы точно хотите удалить Проект?</div>
          <div className={style.modal_options_block}>
            <NavLink
              className={classNames(style.modal_option, style.modal_option_yes)}
              to='/'
              onClick={onSubmitDelete}
            >
              Да
            </NavLink>

            <div
              className={classNames(style.modal_option, style.modal_option_no)}
              onClick={handleCloseModal}
            >
              Нет
            </div>
          </div>
        </Modal>
      )}
      {showCreateTaskModal && (
        <Modal title="Добавление Задачи">
          <form className={style.modal_form} onSubmit={formikTask.handleSubmit}>
            <input
              className={style.form_input}
              type="text"
              id="name"
              placeholder='Название'
              value={formikTask.values.name}
              onChange={formikTask.handleChange} />
            <input
              className={style.form_input}
              type="number"
              id="scope"
              placeholder='Кол-во часов'
              value={formikTask.values.scope}
              onChange={formikTask.handleChange} />
            <div className={style.modal_options_block}>
              <button type='submit'
                className={classNames(style.modal_option, style.modal_option_yes)}
              >
                Да
              </button>

              <div
                className={classNames(style.modal_option, style.modal_option_no)}
                onClick={handleCloseModal}
              >
                Нет
              </div>
            </div>
          </form>
        </Modal>
      )}

      {showMemberModal && (
        <Modal
          title=""
          onClose={() => setShowMemberModal(false)}>
          <div className={style.model_exit_block}>
            <MemberAccount />
            <RoleName />
            <RoleNameArchive />
            <div className={style.hours_per_day}>
              6 ч.
            </div>
            <div className={style.modal_options_block}>
              <div
                className={classNames(style.modal_option, style.modal_option_no)}>
                Удалить
              </div>
              <div
                className={classNames(style.modal_option, style.modal_option_blue)}
                onClick={handleCloseModal}>
                Отменить
              </div>
              <div
                className={classNames(style.modal_option, style.modal_option_yes)}>
                Сохранить
              </div>
            </div>
            <div className={style.modal_option_block}>

            </div>
          </div>

        </Modal>
      )}
      <Menu>
        <NavLink to='/' className={classNames(style.option, style.back)}><div className={classNames(style.options_icon, style.back_icon)}></div><span className={style.option_name}>Вернуться</span></NavLink>

        <div onClick={handleMembersClick} className={classNames(style.option, style.create)}>
          <div className={classNames(style.options_icon, style.view_members_icon)}></div><span className={style.option_name}>Участники</span></div>
        <div onClick={handleCommentsClick} className={classNames(style.option, style.create)}>
          <div className={classNames(style.options_icon, style.comment_icon)}></div><span className={style.option_name}>Комментарии</span></div>
        <div onClick={handleCreateProjectModal} className={classNames(style.option, style.create)}>
          <div className={classNames(style.options_icon, style.create_task_icon)}></div><span className={style.option_name}>Задача</span></div>
        <div onClick={handleDeleteClick} className={classNames(style.option, style.create)}>
          <div className={classNames(style.options_icon, style.delete_project_icon)}></div><span className={style.option_name}>Удалить</span></div>
      </Menu>
      <main
      //  className={style.main_hor}
      >
        <div className={style.left}>

          <div className={style.project_title_block}>
        
              <h2 className={style.project_title}>{projectName}</h2>
        
          </div>
          <div className={style.project_info_main}>
            {!parent && (
              <>
                <h2 className={style.project_description_title}>Описание</h2>
                <div className={style.project_description_full_block}>
                  <p className={style.project_description_full}>
                    React - это JavaScript фреймворк для создания интерфейсов.
                    С его помощью можно быстро и легко создать красивый и функциональный сайт.
                  </p>
                </div>
              </>
            )}
            <h2 className={style.project_task_title}>Задачи</h2>
            <section className={style.project_list}>
              {projects.map((project) => (
                <ProjectMini
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  status={project.status}
                  start_date={project.start_date}
                  scope={project.scope}
                  userCount={project.userCount}
                  parent={project.parent}
                />
              ))}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProjectPage