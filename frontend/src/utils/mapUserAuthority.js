const mapAuthority = {
  ROLE_ADMIN: 'Admin',
  ROLE_CUSTOMER: 'Customer',
  ROLE_DEVELOPER: 'Developer',
  ROLE_MANAGER: 'Manager',
};

const getAuthority = key => mapAuthority[key];

export default getAuthority;
