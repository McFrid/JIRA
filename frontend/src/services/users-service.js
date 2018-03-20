const fetchUsers = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

export default {
  fetchUsers,
};
