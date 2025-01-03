import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import Schems from '../../../utils/validators/validationSchems';
import { createEvent } from '../../../store/slices/eventSlice';
import { connect } from 'react-redux';
import styles from './EventForm.module.sass';

const EventForm = ({ createNewEvent, closeModal }) => {
  const handleSubmit = (values, formikBag) => {
    const { time, date, ...rest } = values;
    const dateN = new Date(`${date}T${time}`);
    const newValues = { ...rest, id: Date.now(), dateN };
    createNewEvent(newValues);
    closeModal();
    formikBag.resetForm();
  };
  return (
    <>
      <div onClick={closeModal} className={styles.background}></div>
      <article className={styles.modalWindow}>
        <h2>Create your event </h2>
        <Formik
          initialValues={{
            text: '',
            date: '',
            time: '00:00',
            timeRemind: '00:00',
            dateRemind: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Schems.EventSchema}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="text" className={styles.label}>
                Write your event
              </label>
              <Field
                name="text"
                type="text"
                label="text"
                className={styles.inputText}
              />
              <ErrorMessage
                name="text"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="date" className={styles.label}>
                Point your event`s date
              </label>
              <div className={styles.dateContainer}>
                <Field
                  name="date"
                  type="date"
                  label="date"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="date" className={styles.label}>
                  Point your event`s time
                </label>
                <Field
                  name="time"
                  type="time"
                  label="time"
                  className={styles.input}
                />
              </div>
              <div className={styles.errorContainer}>
                {' '}
                <ErrorMessage
                  name="date"
                  component="div"
                  className={styles.error}
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className={styles.error}
                />
              </div>
              <ErrorMessage
                name="time"
                component="div"
                className={styles.error}
              />
            </div>

            <span className={styles.textRemind}>Remind me</span>
            <div className={styles.dateContainer}>
              <div className={styles.inputContainer}>
                <Field
                  name="dateRemind"
                  type="date"
                  label="dateRemind"
                  className={styles.input}
                />
              </div>
              <ErrorMessage
                name="dateRemind"
                component="div"
                className={styles.error}
              />
              <div className={styles.inputContainer}>
                <Field
                  name="timeRemind"
                  type="time"
                  label="timeRemind"
                  className={styles.input}
                />
              </div>
              <ErrorMessage
                name="timeRemind"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <button type="submit" className={styles.submitContainer}>
                Create
              </button>
              <button onClick={closeModal} className={styles.closeContainer}>
                Close
              </button>
            </div>
          </Form>
        </Formik>
      </article>
    </>
  );
};

const mDTP = (dispatch) => ({
  createNewEvent: (values) => dispatch(createEvent(values)),
});

export default connect(null, mDTP)(EventForm);
