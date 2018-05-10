import request from '../utils/request';

const STORIES_BASE = 'stories';

const fetchStories = () => request.get(STORIES_BASE);

const saveStory = story => request.post(STORIES_BASE, story);

const updateStory = story => request.put(STORIES_BASE, story);

const removeStory = id => request.delete(`${STORIES_BASE}/${id}`);

export default {
  fetchStories,
  saveStory,
  updateStory,
  removeStory,
};
