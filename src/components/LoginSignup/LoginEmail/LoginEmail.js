import React from 'react'
import { Link, InlineNotification } from 'carbon-components-react'
import { SIGNUP_FLOW, LOGIN_SSO_FLOW } from "../LoginSignup"
import { LOCALSTORAGE_PREFIX } from "../../../constants"
import useLocalStorage from '../../../hooks/use-localstorage'
import { useState } from 'react'
import { Button } from 'carbon-components-react'
import ArrowRight from "@carbon/icons-react/lib/arrow--right/16"
import ArrowLeft from "@carbon/icons-react/lib/arrow--left/16"
import { Checkbox } from 'carbon-components-react'
import { TextInput } from 'carbon-components-react'
import ValidationUtils from '../../../utils/validation-utils'
import AuthService from '../../../services/auth-service'

const AUTH_KEY = `${LOCALSTORAGE_PREFIX}_AUTH_KEY`


const LoginEmail = ({ changeFlowHandler }) => {

    const [authKey, setAuthKey] = useLocalStorage(AUTH_KEY, null)
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(undefined)
    const [isValidPassword, setIsValidPassword] = useState(undefined)
    const [password, setPassword] = useState("")
    const [noRemeberMeAuthKey, setNoRememberMeAuthKey] = useState(null)
    const [rememberMe, setRememberMe] = useState(true)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [twoFactorCode, setTwoFactorCode] = useState("")
    const [isValidTwoFactorCode, setIsValidTwoFactorCode] = useState(undefined)

    const handleRememberMeChange = (status) => {
        setRememberMe(status)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setIsValidEmail(undefined)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setIsValidPassword(undefined)
    }

    const handleEmailBackClick = () => {
        setIsValidEmail(undefined)
    }

    const handleTwoFactorCodeChange = (e) => {
        setTwoFactorCode(e.target.value)
        setIsValidTwoFactorCode(undefined)
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting form");
        if (authKey !== null || noRemeberMeAuthKey !== null) { // 2factor auth
            if (twoFactorCode.length > 0) {
                const ak = noRemeberMeAuthKey !== null ? noRemeberMeAuthKey : authKey
                const sr = await AuthService.twoFactorAuth(ak)
                if (sr === true) {
                    console.log("Successfully logged in ....")
                } else {
                    setIsValidTwoFactorCode(false)
                }
            } else {
                setIsValidTwoFactorCode(false)
            }

        } else if (forgotPassword) { // forgot password

        }
        else { // email pass login
            if (isValidEmail === true) {
                if (password.length > 0) {// hit server  with email and pass
                    const sr = await AuthService.getAuthToken(email, password)
                    if (sr.length > 0) {
                        if (rememberMe === false) {
                            setNoRememberMeAuthKey(sr)
                            setAuthKey(null) // remove already stored key if exists
                        } else {
                            setAuthKey(sr)
                        }
                    } else {
                        setIsValidPassword(false)
                    }
                } else {
                    setIsValidPassword(false)
                }
            } else {
                const iev = ValidationUtils.isValidEmail(email)
                if (iev) {
                    const sr = await AuthService.isEmailExists(email)
                    if (sr.length > 0) {
                        setIsValidEmail(true)
                    } else {
                        setIsValidEmail(false)
                    }
                } else {
                    setIsValidEmail(false)
                }
            }
        }
    }

    const renderForm = () => {
        if (authKey !== null || noRemeberMeAuthKey !== null) {
            return (<form className="login-email__from" onSubmit={handleFormSubmit}>
                <TextInput value={twoFactorCode}
                    placeholder="Code"
                    type="password"
                    id="two-factor"
                    onChange={handleTwoFactorCodeChange}
                    labelText="2-Step Verification" />
                <Button type="submit" renderIcon={() => <ArrowRight className="bx--btn__icon" />}>Login</Button>
                {isValidTwoFactorCode === false && <InlineNotification kind="error" title="Login Failed" subtitle="Incorrect code" />}
            </form>)
        } else if (forgotPassword) {
            return (<form className="login-email__from" onSubmit={handleFormSubmit}>
                <div>{email}</div>
                <Button type="submit">Send Reset Link</Button>
            </form>)
        }
        else {
            return (
                <>
                    <form className="login-email__from" onSubmit={handleFormSubmit}>
                        {isValidEmail ? (<>
                            <div className="login-email__from-email-back">
                                <ArrowLeft onClick={handleEmailBackClick} />
                                <span>{email}</span>
                            </div>
                            <TextInput value={password}
                                placeholder=""
                                type="password"
                                invalid={isValidPassword === false}
                                invalidText={isValidPassword === false ? "Password NotValid" : ""}
                                id="password"
                                onChange={handlePasswordChange}
                                labelText="Password" />
                        </>) : (<>
                            <TextInput value={email}
                                placeholder="john.doe@example.com"
                                type="text"
                                invalid={isValidEmail === false}
                                invalidText={isValidEmail === false ? "Email NotValid" : ""}
                                id="email"
                                onChange={handleEmailChange}
                                labelText="Enter Your Strobes Id" />
                        </>)}
                        <Button type="submit" renderIcon={() => <ArrowRight className="bx--btn__icon" />}>Continue</Button>
                    </form>
                    <div className="login-email__form--rm-forgot-password">
                        <Checkbox id="remeber-me" checked={rememberMe} onChange={handleRememberMeChange} labelText="Remember Me" />
                        {isValidEmail && <Link href="#" onClick={() => setForgotPassword(true)}> Forgot Password</Link>}
                    </div>
                </>

            )
        }
    }

    return <div className="bx--grid login-email">
        <div className="bx--row login-email__title">
            Login
       </div>
        <div className="bx--row login-email__register">
            <span>Don't have an account? </span>
            <Link href="#" onClick={() => changeFlowHandler(SIGNUP_FLOW)}>Register now</Link>
        </div>
        <div className="bx--row login-email__from-container">
            <div className="bx--col">
                {renderForm()}
            </div>
        </div>

        <div className="bx--row">
            <Link href="#" onClick={() => changeFlowHandler(LOGIN_SSO_FLOW)}>Login with SAML SSO</Link>
        </div>
    </div>
}

export default LoginEmail;