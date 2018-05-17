import emailsService from '../../services/emails-service';

const sendEmail = (email, template) => async () => {
  await emailsService.sendEmail(email, template);
};

export default {
  sendEmail,
};
