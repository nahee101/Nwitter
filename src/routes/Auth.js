import { authService } from "fbase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        console.log(event.target.name);
        const {target: {name, value}} = event;

        /* (input) name === email이면 email state 변경 */
        /* (input) name === password이면 password state 변경 */
        if(name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
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
            console.log(error);
        };
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange}
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email}/>
                {/* 🧡 input은 onChange 이벤트 사용해서 value 얻어냄 */}
                <input onChange={onChange}
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}/>
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;