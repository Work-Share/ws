import React, { useState } from 'react';
import Link from 'next/link';
import styles from './signup.module.css'
import { useRouter } from 'next/router'

export default function signup() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [passConf, setPassConf] = useState("")
    const [hostChecked, setHostChecked] = useState("false")
    const [renterChecked, setRenterChecked] = useState("false")
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [passConfirmError, setPassConfirmError] = useState("");

    let router = useRouter();

/*
    const createUser = async (email, hostChecked, renterChecked) => {
        const res = await fetch('/api/createUserDatabase', {
            body: JSON.stringify({
                email: email,
                host: hostChecked,
                renter: renterChecked
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
    }
*/
/*
    const setError = (error, msg) => {
        setEmailError("");
        setPassError("");
        setPassConfirmError("");

        for (let i = 0; i < error.length; ++i) {
            if (error[i] == 'email') {
                setEmailError(msg[i]);
            }
            else if (error[i] == 'pass') {
                setPassError(msg[i]);
            }
            else if (error[i] == 'passConfirm') {
                setPassConfirmError(msg[i]);
            }
        }
    }
*/
    function submit() {
      /*
        if ((pass == passConf)) {
            if (hostChecked === "false" && renterChecked === "false") {
                alert("Please choose your account type")
            }
            else {
                createUser(email, hostChecked, renterChecked)
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, pass)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        //alert("Account Created!");
                        if (router.query.redirect) {
                            router.push({ pathname: "login", query: { redirect: router.query.redirect } });
                        }
                        else {
                            router.push("/login");
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (error.message === "Firebase: Error (auth/invalid-email).") {
                            setError(['email'], ['Invalid email']);
                        }
                        else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                            setError(['pass', 'passConfirm'], ['Password needs to be at least 6 characters', 'Re-enter new password']);
                        }
                        else {
                            alert("There was an unexpected error creating your account. Error " + error.message)
                        }
                    });
            }
        }
        else {
            setError(['passConfirm'], ['Passwords do not match']);
        }
        */
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
                  <label>Check this if you're applying for a host account and you've read and agree to the <a target="_blank" href="https://drive.google.com/file/d/1eaB7ag8mGOtVywuFCbZM-TaIwv6p0QqG/view?usp=sharing" onClick={e => { console.log(e.target.parentElement.parentElement.firstChild.removeAttribute("disabled")); }}>host contract.</a></label>
                </div>

                <div className={styles.contract_checkbox}>
                  <input type="checkbox" disabled onChange={e => {
                      const newChecked = e.target.checked + "";
                      setRenterChecked(newChecked);
                  }} />
                  <label>Check this if you're applying for a renter account and you've read and agree to the <a target="_blank" href="https://drive.google.com/file/d/1F2szip5YNDT1VbC7qdsAtBc7pKRLie3L/view?usp=sharing" onClick={e => { console.log(e.target.parentElement.parentElement.firstChild.removeAttribute("disabled")); }}>renter contract</a></label>
                </div>
              </div>

              <div className={styles.submit_container}>
                <button onClick={submit}>Sign up</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}
