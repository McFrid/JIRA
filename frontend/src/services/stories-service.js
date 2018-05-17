import request from '../utils/request';

const STORIES_BASE = 'stories';

const fetchStories = () => request.get(STORIES_BASE);

const fetchStoriesPage = (page, size) => request.get(`${STORIES_BASE}`, {
  page,
  size,
});

const fetchStoriesPageByLogin = (login, page, size) => request.get(`${STORIES_BASE}`, {
  login,
  page,
  size,
});

const saveStory = story => request.post(STORIES_BASE, story);

const updateStory = story => request.put(STORIES_BASE, story);

const removeStory = id => request.delete(`${STORIES_BASE}/${id}`);

const removeMultipleStories = ids => request.delete(`${STORIES_BASE}`, ids);

const fetchStoriesCount = () => request.get(`${STORIES_BASE}/count`);

const fetchStoriesCountByLogin = login => request.get(`${STORIES_BASE}/count`, {
  login,
});

export default {
  fetchStories,
  fetchStoriesPage,
  fetchStoriesPageByLogin,
  saveStory,
  updateStory,
  removeStory,
  fetchStoriesCount,
  fetchStoriesCountByLogin,
  removeMultipleStories,
};
