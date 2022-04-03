import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './login.module.css'
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function submit() {
    /*
    if (email === "") {
      setError("Enter the email");
      return;
    }

    if (pass === "") {
      setError("Enter the password");
      return;
    }

    await login(email, pass)
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      }
      else if (error.code === "auth/user-not-found") {
        setError("That email doesn't have an account");
      }
      else if (error.code === "auth/wrong-password") {
        setError("The password is incorrect");
      }
      else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts, please try again later");
      }
      else {
        setError("Unexpected error: " + error.message);
      }
    });
    */
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
          <form action="" method="get" className={styles.form_container}>
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
    </div>
  )
}
