import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTriviaContext, useHistory } from '../App.context';
import { Player } from '../Player/player';
import { routes } from '../routes';
import style from './Overview.module.scss';

const AllScore = ({ player }) => {
    const score = player.getFullScore();
    return (<div className={style.ScoreDifficulty}>
        {score.map((item, index) => (
            <div key={index} className={style.ScoreDifficultyColumn}>
                <div className={style.Difficulty}>{item.difficulty}</div>
                <div className={style.Score}>Hits: {item.correct}</div>
                <div className={style.Score}>Errors: {item.wrong}</div>
            </div>))}

    </div>);
};

AllScore.propTypes = {
    player: PropTypes.instanceOf(Player)
};

export const Overview = () => {
    const triviaManager = useTriviaContext();
    const history = useHistory();

    const [player, setPlayer] = useState(new Player());
    const [overview, setOverview] = useState({ correct: 0, wrong: 0 });

    useEffect(() => {
        if (!triviaManager.hasStarted) {
            history.push(routes.home.path);
            return;
        }
        setPlayer(triviaManager.player);
        setOverview(player.getOverview());
        player.save(triviaManager.currentCategory);
    }, [player.sessionToken]);

    const handleHome = () => {
        history.push(routes.home.path);
    };

    return (
        <section className={style.Overview}>
            <div className={style.HeaderContainer}>
                <div className={style.Header}>
                    <h2 className={style.Title}>Congratulation</h2>
                    <h3 className={style.SubTitle}>You finished the test</h3>
                </div>
            </div>
            <div className={style.Performance}>
                <div className={style.Text}>Check your performance on questions</div>
                <div className={style.DottedLine}></div>
            </div>
            <div className={style.ScoreContainer}>
                <div className={style.ScoreColumn}>
                    <div className={style.Score}>{overview.correct}</div>
                    <div className={style.ScoreText}>hits</div>
                </div>
                <div className={style.Spacer}></div>
                <div className={style.ScoreColumn}>
                    <div className={style.Score}>{overview.wrong}</div>
                    <div className={style.ScoreText}>errors</div>
                </div>
            </div>
            <AllScore player={player}></AllScore>
            <div className={style.BtnContainer}>
                <button className={style.BackBtn} onClick={handleHome}>Back to home</button>
            </div>
        </section>
    );
};