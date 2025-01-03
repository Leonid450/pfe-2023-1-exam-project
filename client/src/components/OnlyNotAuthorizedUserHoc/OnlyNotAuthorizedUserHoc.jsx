import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const HocForLoginSignUp = (props) => {
    useEffect(() => {
      props.checkAuth(props.history.replace);
    }, []);

    if (props.isFetching) {
      return <Spinner />;
    }
    if (!props.data) {
      return <Component history={props.history} />;
    }
    return null;
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (replace) => dispatch(getUser(replace)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
