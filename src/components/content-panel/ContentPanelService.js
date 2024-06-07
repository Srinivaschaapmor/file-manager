// import User from "../models/User";

const DashboardService = {
  getUsers: async () => {
    // Example API call to fetch users
    const response = await fetch("http://localhost:3000/api");

    const data = await response.json();

    console.log(`dashboardUser Service- data`, data);
    // Map response data to User objects
    // return data.map((user) => new User(user.id, user.name, user.email));
  },
  // Other CRUD operations can be defined here
};

export default DashboardService;
