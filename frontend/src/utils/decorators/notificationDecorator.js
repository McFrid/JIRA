import toastr from 'toastr';

const notificationDecorator = (thunk, textOnSuccess, textOnFail) => async (dispatch) => {
  try {
    await thunk(dispatch);

    if (textOnSuccess) {
      toastr.success(textOnSuccess);
    }
  } catch (e) {
    if (textOnFail) {
      toastr.error(textOnFail);
    }
    throw e;
  }
};

export default notificationDecorator;