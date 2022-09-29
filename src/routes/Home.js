import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Mweet from "components/Mweet";
import NweetFactory from "components/MweetFactory";

const Home = ({ userObj }) => {
  const [mweets, setMweets] = useState([]);
  useEffect(() => {
    const mwweetsRef = dbService.collection("mweets");
    mwweetsRef.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      const mweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMweets(mweetArray);
    });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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