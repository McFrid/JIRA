export const INIT = 'INIT';

export const init = appState => dispatch => {
    dispatch({
        type: INIT,
        payload: {
            appState
        }
    })
};
