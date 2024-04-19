import React from 'react'
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from "@speechly/react-ui";

function Microphone() {
  return (
    <PushToTalkButtonContainer>
      <PushToTalkButton captureKey=" " />
      <ErrorPanel />
    </PushToTalkButtonContainer>

  );
}

export default Microphone