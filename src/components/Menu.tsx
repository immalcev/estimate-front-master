
import classNames from 'classnames';
import style from '../css/style.module.css';
import { PropsWithChildren, useEffect, useState } from 'react';
import { PersonData } from './types';
import PersonInfo from './PersonInfo';
import axios from 'axios';
import { Base_URL } from '../baseUrl';


const Menu = ({ children }: { children: React.ReactNode }) => {

  const [person, setPerson] = useState<PersonData | null>(null);

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

      } catch (error) {
        console.error('Request failed');
      }
    };

    fetchData();
  }, []);




  return (
    <aside className={classNames(style.left_side, style.side)}>
      <div className={style.my_account_info_block}>
        {person ? (
          <PersonInfo
            id={person.id}
            name={person.name}
            surname={person.surname}
            patronymic={person.patronymic}
          />) : (
          <PersonInfo id={2} surname={''} name={'Admin'} />
        )}
      </div>
      <div className={style.options}>
        {children}
      </div>
    </aside>
  );
};

export default Menu;