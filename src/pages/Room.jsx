import React, { useEffect, useState } from "react";
import client, { databases } from "../appwrite/congif";
import conf from "../conf/conf";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash2, Send } from "react-feather";
import Header from "../component/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  useEffect(() => {
    getMessages();
    const unsubsribe = client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        // console.log("real time :",response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prev) => [response.payload, ...prev]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prev) =>
            prev.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => unsubsribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };
    let premissions = [
      Permission.write(Role.user(user.$id))
    ]

    let response = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      payload
    );
    // console.log(response);
    // setMessages((prev) => [response, ...messages]);
    setMessageBody("");
  };
  const getMessages = async () => {
    const reponse = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    setMessages(reponse.documents);
    // console.log("RESPONSE", reponse);
  };
  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      conf.appwriteDatabaseId, // databaseId
      conf.appwriteCollectionId, // collectionId
      message_id // documentId
    );
    // setMessages((prev) =>
    //   messages.filter((message) => message.$id !== message_id)
    // );
  };
  // console.log(conf);
  // console.log(messages);
  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form id="message-form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say something......"
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            {/* <Send onClick={handleSubmit} /> */}
            <button className="btn btn--secondary" type="submit" value="Send">
              {<Send />}
            </button>
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {message?.username ? (
                    <p>{message.username}</p>
                  ) : (
                    <p>Anonymous</p>
                  )}
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
              </div>
              <div className="message--content">
                <div
                  className={
                    "message--body" +
                    (message.user_id === user.$id
                      ? " message--body--owner"
                      : "")
                  }
                >
                  <span>{message.body}</span>
                </div>
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                  <Trash2
                    className="delete--btn"
                    onClick={() => deleteMessage(message.$id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
