import React, { useEffect, useState } from 'react';
import { useTriviaContext, useHistory } from '../App.context';
import { routes } from '../routes';
import { capitalize } from '../Util/capitalize';
import style from './Trivia.module.scss';
import { difficultiesList } from './triviaManager';
import swal from 'sweetalert';

const Difficulty = () => {
    const triviaManager = useTriviaContext();
    const currentDifficulty = triviaManager.currentDifficulty;
    const stars = Array.from(Array(3), (_, index) => {
        return <i
            key={index}
            style={{ color: index <= currentDifficulty ? '#343c58' : '#b0b0b0' }}
            className="fas fa-star fa-xs"
        ></i>;
    });

    return (
        <div className={style.DifficultyContainer}>
            {stars}
            <span className={style.Difficulty}>{capitalize(difficultiesList[currentDifficulty] || '')}</span>
        </div>
    );
};

export const Trivia = () => {
    const triviaManager = useTriviaContext();
    const [question, setQuestion] = useState({ answers: [], question: '' });
    const [questionNumber, setQuestionNumber] = useState(triviaManager.questionNumber);
    const history = useHistory();

    useEffect(async () => {
        if (!triviaManager.hasStarted) {
            history.push(routes.home.path);
            return;
        }

        if (questionNumber > 10) {
            history.push(routes.overview.path);
        }

        setQuestion(await triviaManager.loadNewQuestion());
        setQuestionNumber(triviaManager.questionNumber);
    }, [questionNumber]);

    const answerAlert = (answer) => {
        if (answer.isCorrect) {
            return swal('Good job!', 'Correct answer!', 'success');
        }

        return swal('Keep trying!', 'Wrong answer!', 'error');
    };

    const handleAnswer = answer => async () => {
        triviaManager.answerCurrentQuestion(answer);
        answerAlert(answer).then(() => setQuestionNumber(triviaManager.questionNumber));
    };

    return (
        <section className={style.Trivia}>
            <div className={style.QuestionHeader}>
                <h2 className={style.Title}>Question {questionNumber}</h2>
                <Difficulty></Difficulty>
            </div>
            <div className={style.Question}>
                <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            </div>
            <div className={style.Options}>
                {question.answers.map((item, index) =>
                    <div
                        role="option"
                        className={style.Option}
                        key={index}
                        onClick={handleAnswer(item)}
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></div>)}
            </div>
        </section>
    );
};