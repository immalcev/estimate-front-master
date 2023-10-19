import { useEffect, useState } from 'react';
import style from '../css/style.module.css';
import Staff from './StaffForCreate';
import { PersonData } from './types';
import Search from './Search';
import axios from 'axios';
import { Base_URL } from '../baseUrl';

const StaffList = () => {

  const [persons, setPersons] = useState<PersonData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPersons = persons.filter((person) => {
    const fullName = `${person.surname} ${person.name} ${person.patronymic}`.toLowerCase();
    const search = searchQuery.toLowerCase();
    return fullName.indexOf(search) !== -1;
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}person/only`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setPersons(response.data);
    } catch (error) {
      console.error('Request failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Search onSearchQueryChange={handleSearchQueryChange} />
      <section className={style.staff_list}>
        {filteredPersons.map((person) => (
          <Staff
            key={person.id}
            id={person.id}
            name={person.name}
            surname={person.surname}
            patronymic={person.patronymic}
          />
        ))}
      </section>
    </>
  )
}
export default StaffList
