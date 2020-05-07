import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import LoginEmail from './LoginEmail'
import LoginSSO from './LoginSSO'
import Signup from './Signup'

export const LOGIN_EMAIL_FLOW = "LOGIN_EMAIL"
export const LOGIN_SSO_FLOW = "LOGIN_SSO"
export const SIGNUP_FLOW = "SIGNUP"

const LoginSignup = () => {
    const [flow, setFlow] = useState(LOGIN_EMAIL_FLOW)

    const changeFlowHandler = useCallback((flow) => {
        setFlow(flow)
    }, [])

    if (flow === LOGIN_EMAIL_FLOW) {
        return <LoginEmail changeFlowHandler={changeFlowHandler} />
    } else if (flow === LOGIN_SSO_FLOW) {
        return <LoginSSO />
    } else {
        return <Signup />
    }
}

export default LoginSignup;