import { useState } from 'react';

import { UserButtons } from './user-buttons';

import classes from './user.module.css';

export const User = () => {
    const [isShow, toggleShow] = useState<boolean>(false);

    const toggleShowProfile = () => {
      toggleShow(!isShow);
    };

    return (
      <div className={classes.wrapper}>
        <p className={classes.name}>Привет, Иван!</p>
        <button className={classes.avatar} onClick={toggleShowProfile} type='button' aria-label='avatar' />
        {isShow && <UserButtons isShow={isShow} />}
      </div>
    );};
