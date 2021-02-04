import 'jest-extended';
import { getIsLogged, getTagList } from './selectors';

describe('Testing selectors', () => {
  const state = {
    auth: false,
    adverts: [{}, {}, {}],
    tags: ['tag1', 'tag2'],
    ui: {
      loading: false,
      error: null,
    },
    advert: { id: '1', features: 'feat' },
  };
  test('should return an array on getTagList', () => {
    expect(getTagList(state)).toBeArray();
  });
  test('should return a boolean on getIsLogged', () => {
    expect(getIsLogged(state)).toBeBoolean();
  });
});
