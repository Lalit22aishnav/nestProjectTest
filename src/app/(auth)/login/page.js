'use client'
import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';


const Page = () => {

    const userRef = useRef(null);
    const passRef = useRef(null);

    const login = async () => {

        if (!userRef.current.value || !passRef.current.value) {
            Swal.fire({
                text: "Username or Password cannot be empty",
                icon: "error"
            });
        } 
        else {

            const authResponse = await signIn('credentials', {
                redirect: false,
                username: userRef.current.value,
                password: passRef.current.value
            });

            if (authResponse?.error) {
                Swal.fire({
                    title: "Oops...",
                    text: authResponse?.error,
                    icon: "error"
                });
            }else{
                window.location.href = "/dashboard";
            }

        }
    }

    return (
        <section className="login">
            <img src="/loginSide.jpeg" alt="Picture of the author" />
            <div>
                <div className="loginHeader">Sign In</div>
                <div className="loginbody">
                    <div>
                        <input type="text" name="username" placeholder="Enter username" className='inputText' ref={userRef} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Enter password" className='inputText' ref={passRef} />
                    </div>
                </div>
                <div className="loginfooter">
                    <button className='btn' onClick={login}>Login</button>
                </div>
            </div>
        </section>
    );
}

export default Page;