import React from 'react'
import LoginSignup from '../../components/LoginSignup'


const LoginPage = () => {
    return (<div className="bx--grid bx--grid--full-width bx--grid--no-gutter landing-page">
        <div className="bx--row landing-page__r1">
            <div className="bx--col-lg-11 landing-page-left">
                <section className="landing-page-left__section">
                    <h1 className="landing-page-left__section-logo">Storbes</h1>
                    <h1 className="landing-page-left__section-logo-exp">A Risk-based Vulnerability Management</h1>
                </section>
                <div className="landing-page-left__section-features-container">
                    <section className="landing-page-left__section">
                        <h1 className="landing-page-left__section-feat">Asset Management</h1>
                        <p className="landing-page-left__section-feat-exp">
                            Monitor all of your digital assets from
                            a unified console.
                    </p>
                    </section>
                    <section className="landing-page-left__section">
                        <h1 className="landing-page-left__section-feat">Security Workflows</h1>
                        <p className="landing-page-left__section-feat-exp">
                            Create and run playbooks to integrate
                            security into your CI/CD pipeline.
                    </p>
                    </section>
                    <section className="landing-page-left__section">
                        <h1 className="landing-page-left__section-feat">Visual Insights</h1>
                        <p className="landing-page-left__section-feat-exp">
                            Augmented with meaningful metrics, Strobes
                            is the single pane of glass into the risks.
                    </p>
                    </section>
                </div>

            </div>
            <div className="bx--col-lg-5 ">
                <div className="bx--grid bx--grid--full-width landing-page-right">
                    <div className="bx-row landing-page-right__r1"></div>
                    <div className="bx-row landing-page-right__r2">
                        <LoginSignup />
                    </div>
                    <div className="bx-row landing-page-right__r3">
                        <div className={"landing-page-right__copyRight"}>© Copyright Strobes 2020. All Rights Reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default LoginPage