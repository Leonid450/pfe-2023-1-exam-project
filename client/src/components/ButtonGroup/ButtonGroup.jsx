import React from 'react';
import { Field } from 'formik';
import CONSTANTS from '../../constants';
import styles from './ButtonGroup.module.sass';
import cx from 'classnames';
const { useState, useEffect } = React;
const ButtonGroup = () => {
  const [choice, setChoice] = useState('yesRecommended');
  const [active, setActive] = useState(1);
  const handleChoice = (value) => {
    setChoice((choice) => {
      if (value === 1) return (choice = 'yesRecommended');
      if (value === 2) return (choice = 'yes');
      return (choice = 'no');
    });
    setActive((active) => {
      return (active = value);
    });
  };
  const focusOne = cx(styles.button, { [styles.focus]: active === 1 });
  const focusTwo = cx(styles.button, { [styles.focus]: active === 2 });
  const focusThree = cx(styles.button, { [styles.focus]: active === 3 });
  return (
    <article className={styles.container}>
      <div>
        <p>Do you want a matching domain (.com URL) with your name</p>
      </div>
      <Field
        type="radio"
        name="domain"
        value={choice}
        className={styles.radio}
      />
      <div className={styles.buttonContainer}>
        <div
          onClick={() => {
            handleChoice(1);
          }}
          className={focusOne}
        >
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}check.svg`} alt="check" />

          <p className={styles.recom}>Recommended</p>
          <p className={styles.choice}>Yes</p>
          <p className={styles.explain}>But minor variations are allowed</p>
        </div>
        <div
          onClick={() => {
            handleChoice(2);
          }}
          className={focusTwo}
        >
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}check.svg`} alt="check" />
          <p className={styles.choice}>Yes</p>
          <p className={styles.explain}>
            The Domain should exactly match the name
          </p>
        </div>
        <div
          onClick={() => {
            handleChoice(3);
          }}
          className={focusThree}
        >
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}check.svg`} alt="check" />
          <p className={styles.choice}>No</p>
          <p className={styles.explain}>I am only for a name, not a Domain</p>
        </div>
      </div>
    </article>
  );
};

export default ButtonGroup;
