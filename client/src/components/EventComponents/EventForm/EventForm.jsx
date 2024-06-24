import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import Schems from '../../../utils/validators/validationSchems';
import { createEvent } from '../../../store/slices/eventSlice';
import { connect } from 'react-redux';

const EventForm = ({ createNewEvent }) => {
  const handleSubmit = (values, formikBag) => {
    const newValues = { ...values, id: Date.now() };
    createNewEvent(newValues);

    formikBag.resetForm();
  };
  return (
    <div>
      {/* {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )} */}
      <h2>Create your event </h2>
      <Formik
        initialValues={{
          text: '',
          // date: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Schems.EventSchema}
      >
        <Form>
          <div>
            <Field
              // classes= styles.inputContainer
              name="text"
              type="text"
              label="text"
            />
            <ErrorMessage name="text" component="div" />
          </div>
          <div>
            {' '}
            <Field
              // classes={formInputClassesDate}
              name="date"
              type="date"
              label="date"
            />
          </div>
          <div>
            <Field
              // classes={formInputClassesDate}
              name="time"
              type="time"
              label="time"
            />
          </div>

          <button
            type="submit"
            // className={styles.submitContainer}
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mDTP = (dispatch) => ({
  createNewEvent: (values) => dispatch(createEvent(values)),
});

export default connect(null, mDTP)(EventForm);
