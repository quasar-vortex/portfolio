const PORT = process.env.PORT as string;
const NODE_ENV = process.env.NODE_ENV as string;
const API_VERSION = parseInt(process.env.API_VERSION as string);
export default { PORT, NODE_ENV, API_VERSION };
