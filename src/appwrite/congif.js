import conf from "../conf/conf";
import { Client, Databases, Account } from "appwrite";

// Init your Web SDK
const client = new Client();

export const account = new Account(client);

client
    .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    .setProject(conf.appwriteProjectId) // Your project ID
;
export const databases = new Databases(client);
export default client;