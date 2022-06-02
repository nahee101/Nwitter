import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { async } from "@firebase/util";

const Nweet = ({nweetObj, isOwner}) => {
    /* editing 모드인지 아닌지 */
    const [editing, setEditing] = useState(false);
    /* 업데이트 */
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if(ok) {
            // delete nweet
            // deletDoc(doc(database, "collection", "document"))
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
        };
    };
    const toggleEditting = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewNweet(value);
    }

    return (
        <div key={nweetObj.id}>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                            onChange={onChange}
                            type="text" 
                            placeholder="Edit your Nweet" 
                            value={newNweet} 
                            required />
                            <input
                            type="submit"
                            value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditting}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditting}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Nweet;