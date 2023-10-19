import classNames from 'classnames';
import style from '../css/style.module.css';
import ProjectMini from '../components/ProjectMini';
import Menu from '../components/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useSignOut } from 'react-auth-kit';
import { PersonData, ProjectData } from '../components/types';
import Search from '../components/Search';
import axios from 'axios';
import { Base_URL } from '../baseUrl';

interface MainPageProps {
  projects: ProjectData[],
  persons: PersonData[];
}

const MainPage: React.FC<MainPageProps> = () => {

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  // const [selectedStatus, setSelectedStatus] = useState<'all' | 1 | 2 >('all');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}user-role-project/tasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Request failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchQueryChange = (query: string) => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // const handleStatusClick = (status: 'all' | 1 | 2 ) => {
  //   setSelectedStatus(status);
  //   const filteredProjects = projects.filter(project => {
  //     if (status === 'all') {
  //       return true;
  //     } else {
  //       return project.status === status;
  //     }
  //   });
  //   setFilteredProjects(filteredProjects);
  // };

  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/LoginPage");
  }

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState<boolean>(false);

  const handleLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
    setShowCreateProjectModal(false);
  };

  return (
    <>
      {showLogoutModal && (
        <Modal title="Информация о Вас">
          <div>вы точно хотите выйти?</div>
          <div className={style.modal_options_block}>
            <div
              className={classNames(style.modal_option, style.modal_option_yes)}

              onClick={logout}
            >
              Да
            </div>
            <div
              className={classNames(style.modal_option, style.modal_option_no)}
              onClick={handleCloseModal}
            >
              Нет
            </div>
          </div>
        </Modal>
      )}

      {showLogoutModal && (
        <Modal title="Выход из аккаунта">
          <div>вы точно хотите выйти?</div>
          <div className={style.modal_options_block}>
            <div
              className={classNames(style.modal_option, style.modal_option_yes)}

              onClick={logout}
            >
              Да
            </div>
            <div
              className={classNames(style.modal_option, style.modal_option_no)}
              onClick={handleCloseModal}
            >
              Нет
            </div>
          </div>
        </Modal>
      )}

      {showCreateProjectModal && (
        <Modal title="Создание Проекта">
          <input type='text' placeholder='Название' className={style.form_input} />
          <div className={style.modal_options_block}>
            <NavLink
              className={classNames(style.modal_option, style.modal_option_yes)}
              to='/projectPage'
              onClick={handleCloseModal}
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

      <Menu>
        <NavLink to='/CreatePage' className={classNames(style.option, style.create)}><div className={classNames(style.options_icon, style.create_project_icon)}></div><span className={style.option_name}>Создать</span></NavLink>
        <NavLink to='/StaffPage' className={classNames(style.option, style.create)}><div className={classNames(style.options_icon, style.view_members_icon)}></div><span className={style.option_name}>Сотрудники</span></NavLink>
        <NavLink to='/CreateUserPage' className={classNames(style.option, style.create)}><div className={classNames(style.options_icon, style.add_member_icon)}></div><span className={style.option_name}>Новый</span></NavLink>
        <div onClick={handleLogoutModal} className={classNames(style.option, style.logout)}>

          <div className={classNames(style.options_icon, style.logout_icon)}></div>
          <span className={style.option_name}>Выйти</span>
        </div>
      </Menu>

      <main>

        <Search onSearchQueryChange={handleSearchQueryChange} />
        <section className={style.project_list}>
          {filteredProjects.map((project) => (
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
      </main>
    </>
  );
}

export default MainPage;