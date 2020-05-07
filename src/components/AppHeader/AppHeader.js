import React from 'react'
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
} from "carbon-components-react/es/components/UIShell";

import { Link } from "react-router-dom"


const AppHeader = () => (
    <Header aria-label="Secure App Header">
        <SkipToContent />
        <HeaderName to="/" element={Link} prefix={""} >
            Strobes
         </HeaderName>

        <HeaderGlobalBar>
            <HeaderGlobalAction className="header-nav-item" aria-label="Docs">
                Docs
            </HeaderGlobalAction>
            <HeaderGlobalAction className="header-nav-item" aria-label="Contact">
                Contact
            </HeaderGlobalAction>
        </HeaderGlobalBar>
    </Header>
);

export default AppHeader;