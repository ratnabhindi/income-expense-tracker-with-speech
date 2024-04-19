import React from 'react'
import ReactDom from 'react-dom'
import { SpeechProvider } from '@speechly/react-client'

import { Provider } from './context/context'
import App from './App'
import './index.css'

ReactDom.render(
    <SpeechProvider appId="78366d86-8e71-4e3f-a871-a9bd7ed97928" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
     document.getElementById("root")
);