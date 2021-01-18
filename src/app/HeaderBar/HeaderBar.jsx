import React, { useEffect, useState } from 'react';
import style from './HeaderBar.module.scss';
import { useTitleContext } from '../App.context';

const HeaderBar = () => {
    const titleManager = useTitleContext();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const unsubscribe = titleManager.subscribe(setTitle);
        return unsubscribe;
    }, [title]);

    return (<header className={style.Header}>
        <h1 className={style.Title}>{title ?? ''}</h1>
    </header>);
};

export { HeaderBar };