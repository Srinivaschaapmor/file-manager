// import User from "../models/User";

const ContentPanelService = {
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
  getEmployees: async () => {
    const response = await fetch("http://localhost:3000/employees");
    const data = await response.json();
    // console.log(`ContentPanelService buttons`, data);
    return data;
  }
};

export default ContentPanelService;
