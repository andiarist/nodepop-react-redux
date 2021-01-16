import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { getTags } from '../../api/adverts';

import { tagsLoaded } from '../../store/actions';
import { getTagList } from '../../store/selectors';

const { Option } = Select;

function TagsSelect({ tagsLoaded, ...props }) {
  useEffect(() => {
    //if (!props.tagsList) {
    getTags().then(({ result: tags }) => tagsLoaded(tags));
    //}
  }, []);

  const { tagsList: tags } = props;
  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      {...props}>
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

TagsSelect.propTypes = {
  tagsList: T.array,
  tagsLoaded: T.func,
};

const mapStateToProps = state => {
  return {
    tagsList: getTagList(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tagsLoaded: tags => dispatch(tagsLoaded(tags)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TagsSelect);
