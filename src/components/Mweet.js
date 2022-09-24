import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { ref, deleteObject } from "@firebase/storage";

const Mweet = ({ mweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMweet, setNewMweet] = useState(mweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this mweet?");

    if (ok) {
      if (mweetObj.attachmentUrl !== "") {
        // Create a reference to the file to delete
        const desertRef = ref(storageService, mweetObj.attachmentUrl);

        // Delete the file
        await deleteObject(desertRef).then(() => {
          // File deleted successfully
          console.log("Do Delete");
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log("Do Not Delete");
        });
      }
      await dbService.doc(`mweets/${mweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`mweets/${mweetObj.id}`).update({
      text: newMweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your mweet"
              value={newMweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Mweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{mweetObj.text}</h4>
          {mweetObj.attachmentUrl && (
            <img src={mweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Mweet</button>
              <button onClick={toggleEditing}>Edit Mweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Mweet;