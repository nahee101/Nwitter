import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const Profile = ({userObj}) => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    const getMyNweets = async() => {
        // dbService의 컬렉션 중 "nweets" Docs에서 
        // userObj의 uid와 동일한 creatorID를 가진 모든 문서를 
        // 내림차순으로 가져오는 쿼리(요청) 생성
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        
        // getDocs() 메소드로 쿼리 결과 값 가져오기 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
        });
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Sign Out</button>
        </>
    )
};

export default Profile;