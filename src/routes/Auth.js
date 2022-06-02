import { authService } from "fbase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 

    GithubAuthProvider, 
    GoogleAuthProvider, 

    signInWithPopup} from "firebase/auth";
import { async } from "@firebase/util";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (event) => {
        console.log(event.target.name);
        const {target: {name, value}} = event;

        /* (input) name === email이면 email state 변경 */
        /* (input) name === password이면 password state 변경 */
        if(name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        
        try {
            let data;
            if(newAccount) {
                // 새 계정 생성
                data = await createUserWithEmailAndPassword (
                    authService,
                    email, password
                );
            } else {
                // 로그인
                data = await signInWithEmailAndPassword (
                    authService,
                    email, password
                );
            };
            console.log(data);
        } catch(error) {
            console.log(error.message);
            setError(error.message);
        };
    };

    const toggleAccount = () => setNewAccount(prev => !prev);
    const onSocialClick = async (event) => {
        const {target: {name}} = event;
        let provider;

        if(name === 'google') {
            provider = new GoogleAuthProvider();
        } else if(name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange}
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email}
                />
                {/* 🧡 input은 onChange 이벤트 사용해서 value 얻어냄 */}
                <input onChange={onChange}
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                />
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Sign In"} 
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            <div>
                <button 
                name="google"
                onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button 
                name="github"
                onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;