import React, { useState, useEffect } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty, Button, Spin, List, Divider } from 'antd';

import storage from '../../../utils/storage';
//import { getAdverts } from '../../../api/adverts';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';

import * as actions from '../../../store/actions';
import {
  getAdvertsList,
  getAdvertsLoading,
  getAdvertsError,
  getAdvertsInfo,
} from '../../../store/selectors';

function AdvertsPage({ advertsLoaded, getAdvertsInfo }) {
  const initialFilters = storage.get('filters') || defaultFilters;
  const [filters, setFilters] = useState(initialFilters);

  const formatFilters = () => {
    const { name, sale, price, tags } = filters;

    const filtersQuery = {};
    if (name) {
      filtersQuery.name = name;
    }
    if (['sell', 'buy'].includes(sale)) {
      filtersQuery.sale = sale === 'sell';
    }
    if (price.length) {
      filtersQuery.price = price.join('-');
    }
    if (tags.length) {
      filtersQuery.tags = tags.join(',');
    }

    return filtersQuery;
  };

  const getAdverts = () => {
    advertsLoaded(formatFilters());
  };

  const handleSubmit = filters => {
    storage.set('filters', filters);
    setFilters(filters);
  };

  const renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  const renderError = () => {
    const { error } = getAdvertsInfo;
    return (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}>
        <Button type="primary" danger onClick={getAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  const renderEmpty = () => {
    //const { filters } = this.state;
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  const renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  const renderAdverts = () => {
    const { loading, error, adverts } = getAdvertsInfo;
    //const adverts = this.props.getAdvertsList;

    if (loading) {
      return renderLoading();
    }

    if (error) {
      return renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={renderAdvert}
      />
    );
  };

  useEffect(() => {
    getAdverts();
    console.log('filters:', filters);
  }, [filters]);

  return (
    <Layout title="Adverts list">
      <Divider>Filter your adverts</Divider>
      <FiltersForm initialFilters={filters} onSubmit={handleSubmit} />
      <Divider>Adverts</Divider>
      {renderAdverts()}
    </Layout>
  );
}

AdvertsPage.propTypes = {
  advertsLoaded: T.func,
  getAdvertsInfo: T.object,
  getAdvertsList: T.array,
  getAdvertsLoading: T.bool,
  getAdvertsError: T.bool,
};

const mapStateToProps = state => {
  return {
    getAdvertsList: getAdvertsList(state),
    getAdvertsLoading: getAdvertsLoading(state),
    getAdvertsError: getAdvertsError(state),
    getAdvertsInfo: getAdvertsInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advertsLoaded: adverts => dispatch(actions.advertsLoaded(adverts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
