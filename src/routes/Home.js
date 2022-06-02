import { async } from "@firebase/util";
import { dbService } from "fbase";
/* Cloud Firestore에서 자동으로 ID 생성 */
import { 
    collection, addDoc, onSnapshot,
    query, orderBy } 
    from "firebase/firestore";
import React, { useState, useEffect } from "react";

import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    /* 🧡 작성한 nweet firestore에 저장 */
    const [nweet, setNweet] = useState('');
    /* 🧡 작성했던 nweet firestore에서 가져오기 */
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id, ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };
    return (
        <div>
            <form
            onSubmit={onSubmit}>
                <input
                onChange={onChange}
                value={nweet}
                type="text" 
                placeholder="what's on your mind?" 
                maxLength={120} />
                <input 
                type="submit" 
                value="Nweet" />
            </form>

            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                    key={nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid} />
                ))
                }
            </div>
        </div>
    );
};

export default Home;