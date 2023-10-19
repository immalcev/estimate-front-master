import { useEffect, useState } from 'react';
import style from '../css/style.module.css';
import Staff from './StaffForCreate';
import { PersonData } from './types';
import axios from 'axios';
import classNames from 'classnames';
import { Base_URL } from '../baseUrl';

const StaffListForCreate = () => {
  const [persons, setPersons] = useState<PersonData[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<number[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Base_URL}person`, {
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

  const handlePersonClick = (id: number) => {
    if (selectedPersons.includes(id)) {
      setSelectedPersons((prev) => prev.filter((p) => p !== id));
    } else {
      setSelectedPersons((prev) => [...prev, id]);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      await Promise.all(
        selectedPersons.map((id) =>
          axios.post(
            `${Base_URL}user_role_project`,
            {
              userid: id,
              roleid: 1,
              projectid: 37,
              type_of_activityid: 3,
              score: 3,
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

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={style.staff_list}>
        {persons.map((person) => (
          <Staff
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
      <button
        className={classNames(style.modal_option, style.modal_option_blue)}
        disabled={selectedPersons.length === 0}
        onClick={handleSubmit}
      >
        Assign tasks
      </button>
    </>
  );
};

export default StaffListForCreate;