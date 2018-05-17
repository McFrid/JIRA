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

    console.log({e});
    throw e;
  }
};

export default notificationDecorator;