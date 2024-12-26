import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, contestProps) => {
  const Hoc = (props) => {
    useEffect(() => {
      if (!props.data) {
        props.getUser();
      }
    }, []);

    return (
      <>
        {props.isFetching ? (
          <Spinner />
        ) : (
          <Component
            history={props.history}
            match={props.match}
            {...contestProps}
          />
        )}
      </>
    );
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
