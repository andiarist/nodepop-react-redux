import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'antd';

//import { getTags } from '../../api/adverts';

import { getTags } from '../../store/actions';
import { getTagList } from '../../store/selectors';

const { Option } = Select;

function TagsSelect({ tags, getTags, ...props }) {
  useEffect(() => {
    getTags();
  }, []);

  //const { tagsList: tags } = props;
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
    tags: getTagList(state),
  };
};
const mapDispatchToProps = dispatch => ({
  getTags: tags => dispatch(getTags(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsSelect);
