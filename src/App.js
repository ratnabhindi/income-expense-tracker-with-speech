import React, { useContext, useEffect, useRef} from 'react'
import { Grid } from '@material-ui/core'
import { useSpeechContext, SpeechState } from '@speechly/react-client'
import { PushToTalkButtonContainer, PushToTalkButton, ErrorPanel} from '@speechly/react-ui'

import Main from './components/Main/Main'
import Details from './components/Details/Details'
import useStyles from './styles'
import { ExpenseTrackerContext } from './context/context'
import Microphone from './components/Microphone'

const App = () => {
    const classes = useStyles();
    const { speechState } = useSpeechContext();
    const main = useRef(null);
    const executeScroll = () => main.current.scrollIntoView({
        behavior: "smooth"
      });

    useEffect(() => {
        if(speechState === SpeechState.Recording)
            executeScroll();

    }, [speechState]);

    return (
        <div style={{verticalAlign: 'center'}}>
            <Grid container className={classes.grid}  spacing={0} alignItems="center" justify="center"  style={{height: '100vh'}}>
                <Grid item xs={12} sm={4} className={classes.hideOnMobile}>
                    <Details title='Income' />
                </Grid>
                <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.desktop}>
                    <Details title='Income' />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.last}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
            {/* <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer> */}
            <Microphone />
        </div>
    )
}

export default App
