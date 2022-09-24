import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Mweet from "components/Mweet";

const Home = ({ userObj }) => {
  const [mweet, setMweet] = useState("");
  const [mweets, setMweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "" && attachment !== null) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const mweetObj = {
      text: mweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("mweets").add(mweetObj);
    setMweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (theFile !== undefined) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="mweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="Selected" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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