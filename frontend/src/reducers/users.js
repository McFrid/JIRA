const initState = [{
  id: 1,
  email: 'test@google.com',
  firstName: 'Firts Name 1',
  lastName: 'Last Name 1',
  experience: 1.2,
}, {
  id: 2,
  email: 'test2@google.com',
  firstName: 'Firts Name 2',
  lastName: 'Last Name 2',
  experience: 2.2,
}]

const userState = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userState;