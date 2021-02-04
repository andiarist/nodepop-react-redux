import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Testing <Layout />', () => {
  test('should show <Layout /> properly', () => {
    const props = {
      title: 'title',
      children: 'children',
    };
    const wrapper = shallow(<Layout {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
