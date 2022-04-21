import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './signup.module.css';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

export default function Signup() {
  // Form states
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConf, setPassConf] = useState("");
  const [hostChecked, setHostChecked] = useState("false");
  const [renterChecked, setRenterChecked] = useState("false");
  // Error states
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passConfirmError, setPassConfirmError] = useState("");
  const [otherError, setOtherError] = useState("");

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


  // Show errors to the user
  const setError = (errors) => {
      setEmailError("");
      setPassError("");
      setPassConfirmError("");
      setOtherError("");

      for (let i = 0; i < errors.length; ++i) {
          if (errors[i][0] === 'email') {
              setEmailError(errors[i][1]);
          }
          else if (errors[i][0] === 'pass') {
              setPassError(errors[i][1]);
          }
          else if (errors[i][0] === 'passConfirm') {
              setPassConfirmError(errors[i][1]);
          }
          else if (errors[i][0] === 'other') {
              setOtherError(errors[i][1]);
          }
      }
  }

  const submit = async (e) => {
    e.preventDefault();
    const errors = [];

    // Validate form
    if (!email) {
      errors.push(['email', 'Email is required']);
    }

    if (!pass) {
      errors.push(['pass', 'Password is required']);
    }

    if (pass !== passConf) {
      errors.push(['passConfirm', 'Passwords do not match']);
    }

    if (renterChecked === "false") {
      errors.push(['other', 'You must read and agree to the renter contract']);
    }

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    setSignUpLoading(true);

    // POST the data
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          email: email,
          password: pass,
          host: hostChecked
        })
    });

    const data = await res.json();
    if (res.status !== 200) {
      console.log('Setting error')
      setError([['other', data.msg]]);
    }

    // Success, sign in and redirect
    const status = await signIn('credentials', {
      redirect: false,
      email: email,
      password: pass
    });

    if (status.error) {
      setError([['other', status.error]]);
    }
    else {
      if (router.query.redirect) {
        router.push(router.query.redirect);
      }
      else {
        router.push("/dashboard");
      }
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.form_container}>
          <h1 className={styles.title}>Sign Up</h1>
          <div className={styles.links}>
            <p>Already have an account? <Link href="/auth/login"><a>Log in!</a></Link></p>
          </div>

          <form action="" method="get" className="signup-form">
            <div className={styles.form_element_wrapper}>
              <div className={styles.form_element}>
                <input placeholder="Email" type="email" name="name" id={styles.email} onChange={e => {
                    const newEmail = e.target.value;
                    setEmail(newEmail);
                }} required />
                <div className={styles.form_error}>
                    <p>{emailError}</p>
                </div>
              </div>
            </div>

              <div className={styles.form_element_wrapper}>
                <div className={styles.form_element}>
                  <input placeholder="Password" type="password" name="password" id={styles.password} onChange={e => {
                      const newPass = e.target.value;
                      setPass(newPass);
                  }} required />
                  <div className={styles.form_error}>
                      <p>{passError}</p>
                  </div>
                </div>
              </div>

              <div className={styles.form_element_wrapper}>
                <div className={styles.form_element}>
                  <input placeholder="Confirm Password" type="password" name="confirm-password" id={styles.confirm_password} onChange={e => {
                      const newConfirmPass = e.target.value;
                      setPassConf(newConfirmPass);
                  }} required />
                  <div className={styles.form_error}>
                      <p>{passConfirmError}</p>
                  </div>
                </div>
              </div>

              <div className={styles.contractCheckboxes}>
                <div className={styles.contract_checkbox}>
                  <input type="checkbox" disabled onChange={e => {
                      const newChecked = e.target.checked + "";
                      setHostChecked(newChecked);
                  }} />
                  <label>Check this if you are applying for a host account and you have read and agree to the <a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1eaB7ag8mGOtVywuFCbZM-TaIwv6p0QqG/view?usp=sharing" onClick={e => { console.log(e.target.parentElement.parentElement.firstChild.removeAttribute("disabled")); }}>host contract.</a></label>
                </div>

                <div className={styles.contract_checkbox}>
                  <input type="checkbox" disabled onChange={e => {
                      const newChecked = e.target.checked + "";
                      setRenterChecked(newChecked);
                  }} />
                  <label>Check this if you are applying for a renter account and you have read and agree to the <a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1F2szip5YNDT1VbC7qdsAtBc7pKRLie3L/view?usp=sharing" onClick={e => { console.log(e.target.parentElement.parentElement.firstChild.removeAttribute("disabled")); }}>renter contract</a></label>
                </div>
              </div>

              <div className={styles.submit_container}>
                <button onClick={submit}>Sign up</button>
              </div>

              <div className={styles.other_error}>
                  <p>{otherError}</p>
              </div>
          </form>
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
