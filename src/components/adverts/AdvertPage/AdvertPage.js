import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Divider, Image, Typography, Statistic, Row, Col } from 'antd';

import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

import * as actions from '../../../store/actions';
import { getUi, getAdvertDetail } from '../../../store/selectors';

const { Title } = Typography;

function AdvertPage({ advertDetail, advertLoaded, advertDeleted, ...props }) {
  const [error, setError] = useState(null);

  const getAdvertId = props.match.params.id;

  const handleDeleteClick = () => {
    const { history } = props;
    //deleteAdvert(getAdvertId).then(() => history.push('/'));
    advertDeleted(getAdvertId, history);
  };

  const getAdvertById = async () => {
    advertLoaded(getAdvertId);
  };

  const renderAdvert = () => {
    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advertDetail) {
      return null;
    }

    const { name, price, tags, sale, photoUrl } = advertDetail;

    return (
      <Row>
        <Col span={24}>
          <Title level={2}>
            {name} - {sale ? 'Sell' : 'Buy'}
          </Title>
        </Col>
        <Col span={12}>
          <Statistic title="Price" value={price} formatter={formatter} />
          <div style={{ marginTop: 20 }}>
            <span style={{ marginRight: 5 }}>Tags</span>
            <Tags tags={tags} />
          </div>
        </Col>
        <Col span={12}>
          <Image
            src={photoUrl}
            alt={name}
            width={300}
            height={300}
            fallback={placeholder}
          />
        </Col>
        <ConfirmationButton
          danger
          icon={<DeleteOutlined />}
          confirmationProps={{
            title: 'Delete advert?',
            content: 'Are you sure you want to delete this advert?',
            okText: 'Yes',
            cancelText: 'No',
            okButtonProps: {
              danger: true,
            },
          }}
          onConfirm={handleDeleteClick}
          style={{ marginTop: 20 }}
          block>
          Delete
        </ConfirmationButton>
      </Row>
    );
  };

  useEffect(() => {
    getAdvertById();
  }, []);

  return (
    <Layout title="Advert detail">
      <Divider>Detail of your advert</Divider>
      {renderAdvert()}
    </Layout>
  );
}

AdvertPage.propTypes = {
  match: T.shape({ params: T.shape({ id: T.string.isRequired }).isRequired })
    .isRequired,
  history: T.object,
};

const mapStateToProps = state => {
  return {
    advertDetail: getAdvertDetail(state),
    getUi: getUi(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advertLoaded: advertId => dispatch(actions.advertLoaded(advertId)),
    advertDeleted: (advertId, history) =>
      dispatch(actions.advertDeleted(advertId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
