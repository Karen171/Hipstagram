import React from 'react';
import glass from '../../img/search_icon.png';
import {getUsersByLoginThunk} from '../../store/users/thunks';
import { DebounceInput } from 'react-debounce-input';
import  './style.scss';


const SearchField = ({dispatch}) => {
    const handleSearchUserByLogin = async (login) => {
        dispatch(getUsersByLoginThunk(login))
    }
    return (
        <div className="searchField">
            <img className="glassIcon" src={glass} alt="glass"/>
            <DebounceInput
                minLength={1}
                debounceTimeout={500}
                onChange={e => handleSearchUserByLogin(e.target.value)}
            />
        </div>
    );
}

export default SearchField;