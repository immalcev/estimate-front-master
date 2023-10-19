import style from '../css/style.module.css';
import { useState } from 'react';
import { SearchProps } from './types';

const Search: React.FC<SearchProps> = ({ onSearchQueryChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearchQueryChange(event.target.value);
  };

  return (
    <form className={style.project_search_block}>
      <div className={style.search}>
        <input
          className={style.project_search}
          type="search"
          placeholder="Найти"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
    </form>
  );
};

export default Search