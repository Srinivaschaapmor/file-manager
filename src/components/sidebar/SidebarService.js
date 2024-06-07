// import axios from "../../mockData";

const SidebarService = {
  getPaths: async () => {
    const response = await fetch("http://localhost:3000/paths");
    const data = await response.json();
    // console.log(`ContentPanelService paths`, data);
    return data;
  },

  getButtons: async () => {
    const response = await fetch("http://localhost:3000/buttons");
    const data = await response.json();
    // console.log(`ContentPanelService buttons`, data);
    return data;
  },

  // getUsers: async () => {
  //   // axios
  //   //   .get("/users")
  //   //   .then((response) => {
  //   //     // setUsers(response.data.users);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching users:", error);
  //   //   });
  // },
};

export default SidebarService;
