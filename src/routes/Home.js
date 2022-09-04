import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Mweet from "components/Mweet";

const Home = ({ userObj }) => {
  const [mweet, setMweet] = useState("");
  const [mweets, setMweets] = useState([]);
  useEffect(() => {
    dbService.collection("mweets").onSnapshot((snapshot) => {
        const mweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMweets(mweetArray);
      });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("mweets").add({
      text: mweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,      
    });
    setMweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={mweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="mweet" />
      </form>
      <div>
        {mweets.map((mweet) => (
          <Mweet
            key={mweet.id}
            mweetObj={mweet}
            isOwner={mweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;