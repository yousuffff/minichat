import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/congif";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUserOnLoad();
    // setLoading(false);
  }, []);

  const getUserOnLoad = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
      
    } catch (error) {
      
      console.error(error);
    }setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      const promise = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      console.log("logged in", promise);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleUserLogout=async()=>{

    try {
      await account.deleteSession("current");
      setUser(null);
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }
  const handleSignUp = async(e, credentials)=>{
   e.preventDefault();

   if(credentials.password !== credentials.password2){
     alert("Passwords do not match")
     return;
   }
   try {
    await account.create(
      ID.unique(), 
      credentials.email, 
      credentials.password, 
      credentials.name
    )
    await account.createEmailPasswordSession(
      credentials.email,
      credentials.password
    )

    const accountDetails = await account.get();
    setUser(accountDetails);
    navigate("/")
   } catch (error) {
    console.error(error)
   }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleSignUp
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading.......</p> : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
