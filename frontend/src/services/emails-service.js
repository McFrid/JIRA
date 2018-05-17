import request from '../utils/request';

const USERS_BASE = 'mail';

const fetchTemplates = () => request.get(`${USERS_BASE}/templates`);

const sendEmail = (mail, template) => request.post(`${USERS_BASE}/send${template ? `?template=${template}` : ''}`, mail);

export default {
  fetchTemplates,
  sendEmail,
};
