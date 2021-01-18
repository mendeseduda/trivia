import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { routes } from '../routes';
import style from './Home.module.scss';
import { useTitleContext, useTriviaContext, useHistory } from '../App.context';
import { Player } from '../Player/player';

const Categories = ({ list }) => {
    const titleManager = useTitleContext();
    const triviaManager = useTriviaContext();
    const history = useHistory();

    const startTrivia = (category) => async () => {
        titleManager.setTitle(category.name);
        let route = routes.overview.path;

        let player = Player.findByCategoryId(category.id);
        if (player == null) {
            const response = await triviaManager.triviaRepository.createToken();
            if (response.isSuccess) {
                player = new Player(response.data.token);
                route = routes.trivia.path;
            }
        }

        triviaManager.start(category, player);
        history.push(route);
    };

    return list.map((category, index) =>
        <div
            key={index}
            onClick={startTrivia(category, triviaManager)}
            className={style.Category}
            role="category"
        >{category.name}</div>
    );
};

Categories.propType = {
    list: PropTypes.array
};

export const Home = () => {
    const titleManager = useTitleContext();
    const triviaManager = useTriviaContext();
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        titleManager.setTitle('Dev Mobile');
        const response = await triviaManager.triviaRepository.listCategories();

        if (response.isSuccess) {
            setCategories(response.data['trivia_categories']);
        }
    }, []);

    return (
        <section className={style.Home}>
            <h2 className={style.Title}>Categories</h2>
            <div role="categories" className={style.Categories}>
                <Categories list={categories}></Categories>
            </div>
        </section>
    );
};