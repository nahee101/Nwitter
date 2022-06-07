import { async } from "@firebase/util";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
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
    /* 사진 업로드 관련 */
    const [attachment, setAttachment] = useState('');

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
        
        let attachmentUrl = "";

        /* 파일 첨부 없이 텍스트만 올리고 싶은 경우가 있어 
        attachment가 있을 때만 하단 코드 실행*/
        if(attachment !== "") {
            // 파일 경로 참조 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}` );
            // storage 참조 경로로 파일 업로드 하기
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log(response) // rules 들어가서 false로 돼 있는 거 true로 변경해야 함
            // 참조 경로에 있는 파일의 URL을 다운로드 해서 attachmentURL 변수에 넣어 업데이트
            attachmentUrl = await getDownloadURL(response.ref);
        };

        // submit하면 
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };

        await addDoc(collection(dbService, "nweets"), nweetObj);

        // state를 비워서 form 비우기
        setNweet(""); 

        // state를 비워서 파일 미리보기 img src 비우기
        setAttachment("");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        // 파일 이름 읽기
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttatchment = () => setAttachment('');

    return (
        <div>
            <form
            onSubmit={onSubmit}>
                {/* nweet 작성창 */}
                <input
                onChange={onChange}
                value={nweet}
                type="text" 
                placeholder="what's on your mind?" 
                maxLength={120} />
                {/* nweet 사진 업로드 */}
                <input 
                onChange={onFileChange}
                type="file" 
                accept="image/*" />
                {/* nweet 업로드 */}
                <input 
                type="submit" 
                value="Nweet" />
                {/* 업로드할 사진 미리 보기 */}
                {attachment && (
                    <div>
                        <img 
                        src={attachment} 
                        width="50px" height="50px" />

                        <button
                        onClick={onClearAttatchment}>Clear</button>
                    </div>
                )}
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