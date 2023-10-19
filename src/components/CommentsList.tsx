import { useCallback, useEffect, useState } from 'react';
import style from '../css/style.module.css';
import { CommentData, PersonData } from './types'
import axios from 'axios';
import Coment from './Coment';
import { useParams } from 'react-router-dom';
import { Base_URL } from '../baseUrl';

const CommentsList = () => {

  const [comments, setComments] = useState<CommentData[]>([]);
  const [persons, setPersons] = useState<PersonData[]>([]);
  const { id, user } = useParams();
  
  const fetchDataComments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}comment?taskid=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Request failed');
    }
  }, [id]);

  const fetchDataPerson = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_URL}person/${user}`, {
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
    fetchDataPerson();
    fetchDataComments();
  }, []);
  return (
    <>
      <section className={style.coments_list}>
        {comments.map((comment) => (
          <Coment
            key={comment.id}
            id={comment.id}
            user={comment.user}
            comments={comment.comments}
            taskid={comment.taskid}
          />
        ))}
      </section>
    </>
  )
}
export default CommentsList
