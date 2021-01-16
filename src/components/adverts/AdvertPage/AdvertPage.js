import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Divider, Image, Typography, Statistic, Row, Col } from 'antd';

import { getAdvert, deleteAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

import * as actions from '../../../store/actions';

const { Title } = Typography;

function AdvertPage({ advertDetail, advertLoaded, ...props }) {
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);

  const getAdvertId = () => props.match.params.id;

  const handleDeleteClick = () => {
    const { history } = props;
    deleteAdvert(getAdvertId()).then(() => history.push('/'));
  };

  const getAdvertById = async () => {
    try {
      const { result } = await getAdvert(getAdvertId());

      if (!result) {
        const error = { message: 'Not found' };
        throw error;
      }
      setAdvert(result);
    } catch (error) {
      setError(error);
    }
  };

  const renderAdvert = () => {
    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) {
      return null;
    }

    const { name, price, tags, sale, photoUrl } = advert;

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
};

const mapStateToProps = state => {
  return {
    advertDetail: state.advert,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advertLoaded: advertId => dispatch(actions.advertLoaded(advertId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
