import request from '../utils/request';

const STORIES_BASE = 'stories';

const fetchStories = () => request.get(STORIES_BASE);

const fetchStoriesPage = (page, size) => request.get(`${STORIES_BASE}`, {
  page,
  size,
});

const saveStory = story => request.post(STORIES_BASE, story);

const updateStory = story => request.put(STORIES_BASE, story);

const removeStory = id => request.delete(`${STORIES_BASE}/${id}`);

const fetchStoriesCount = () => request.get(`${STORIES_BASE}/count`);

export default {
  fetchStories,
  fetchStoriesPage,
  saveStory,
  updateStory,
  removeStory,
  fetchStoriesCount,
};
