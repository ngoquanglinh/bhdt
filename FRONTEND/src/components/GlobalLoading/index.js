import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import LoadingIcon from './../../assets/images/loading.gif';
import './style.css';

class GlobalLoading extends Component {
  render() {
    const { showLoading } = this.props;
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className="global-loading">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      );
    }
    return xhtml;
  }
}

GlobalLoading.propTypes = {
  showLoading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    showLoading: state.ui?.showLoading,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect
)(GlobalLoading);
