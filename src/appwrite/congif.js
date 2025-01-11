import conf from "../conf/conf";
import { Client, Databases, Account } from "appwrite";

// Init your Web SDK
const client = new Client();

export const account = new Account(client);

client
  .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
  // .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID
// .setProject(conf.appwriteProjectId) // Your project ID
export const databases = new Databases(client);
export default client;
// import conf from '../conf/conf.js'
// import { Client, Account, ID } from "appwrite";

// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client)

//     }
//     async createAccount({ email, password, name }) {

//         try {
//             const userAcc = await this.account.create(ID.unique(), email, password, name)
//             if (userAcc) {
//                 //call another function
//                 return this.login({ email, password })
//             } else {
//                 return userAcc;
//             }
//         } catch (error) {
//             throw error
//         }
//     }

//     async login({ email, password }) {
//         try {
//             return await this.account.createEmailPasswordSession(email, password)
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getCurrentUser() {
//         try {
//             return await this.account.get()
//         } catch (error) {
//             console.log('appwrite service :: getCurrentUser :: error: ', error)
//         }
//         return null;
//     }
//     async logOut() {
//         try {
//             await this.account.deleteSessions()
//         } catch (error) {
//             throw error;
//         }
//     }

// }

// const authService = new AuthService;
// export default authService;
