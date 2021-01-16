import React, { useState } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Alert, Divider } from 'antd';

import { createAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

import { advertCreated } from '../../../store/actions';

function NewAdvertPage({ history, onCreateAdvert }) {
  const [error, setError] = useState(null);

  const handleSubmit = advert => {
    resetError();

    onCreateAdvert(advert, history);
  };

  const resetError = () => setError(null);

  return (
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {error && (
        <Alert
          afterClose={resetError}
          closable
          message={error}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
  onCreateAdvert: T.func,
};

const mapDispatchToProps = dispatch => ({
  onCreateAdvert: (advert, history) => dispatch(advertCreated(advert, history)),
});

export default connect(null, mapDispatchToProps)(NewAdvertPage);
