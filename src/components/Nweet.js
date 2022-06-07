import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "fbase";
import { async } from "@firebase/util";

const Nweet = ({nweetObj, isOwner}) => {
    /* editing 모드인지 아닌지 */
    const [editing, setEditing] = useState(false);
    /* 업데이트 */
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //삭제하려는 이미지 파일을 가리키는 ref 생성하기
    const desertRef = ref(storageService, nweetObj.attachmentURL);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 nweet을 삭제할까요?");
        if(ok) {
            // 해당 nweet 파이어스토어에서 삭제
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            // 삭제하려는 nweet에 이미지 파일이 있으면 이미지 파일을 storage에서 삭제
            if(nweetObj.attachmentURL !== "") {
                await deleteObject(desertRef);
            }
        };
    };

    /* editing 모드 끄고 켜기 */
    const toggleEditting = () => setEditing((prev) => !prev);

    /* 업데이트 */
    const onSubmit = async (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), {text: newNweet});
        setEditing(false);
    };
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
                        {nweetObj.attachmentUrl && (
                            <img src={nweetObj.attachmentURL} width="50px" height="50px" />
                        )}
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