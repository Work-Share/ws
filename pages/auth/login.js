import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './login.module.css'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/react';

export default function login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/dashboard');
      }
      else {
        setLoading(false);
      }
    });
  });

  const submit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setError("Enter the email");
      return;
    }

    if (pass === "") {
      setError("Enter the password");
      return;
    }

    setSignUpLoading(true);

    const status = await signIn('credentials', {
      redirect: false,
      email: email,
      password: pass
    });

    if (status.error) {
      setError(status.error);
    }
    else {
      router.push("/dashboard");
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.yee}>
        <h1 className={styles.title}>Log In</h1>
        <div className={styles.links}>
          <p>Do not have an account? <Link href="/auth/signup"><a>Sign up!</a></Link></p>
          <Link href='#'><a>Forgot password?</a></Link>
        </div>
        <div className={styles.page}>
          <form className={styles.form_container}>
            <div className={styles.form_element}>
              <input type="email" placeholder="Email" name="name" id={styles.email} onChange={e => {
                const newEmail = e.target.value;
                setEmail(newEmail);
              }} required />
            </div>

            <div className={styles.form_element}>
              <input type="password" placeholder="Password" name="password" id={styles.password} onChange={e => {
                const newPass = e.target.value;
                setPass(newPass);
              }} required />
            </div>

            <div className={styles.submit_container}>
              <button onClick={submit}>Log In</button>
            </div>
          </form>
        </div>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>

      { signUpLoading ?
          <div className="loading">
            <p>Loading</p>
            <div className="lds_ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        :
        <div></div>
      }
    </div>
  )
}
