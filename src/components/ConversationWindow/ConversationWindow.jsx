import React, { PropTypes } from 'react';
import moment from 'moment';
import ChatBox from 'components/ChatBox';
import ToneBox from 'components/ToneBox';
import ToneHistory from 'components/ToneHistory';
import TitleBar from './TitleBar';
import classes from './ConversationWindow.scss';

const formatName = ({ owner, lastContext }) => (lastContext.fname
  ? `${lastContext.fname} ${lastContext.lname}`
  : owner
);

const timeFormat = 'MMM Do, h:mm a';
const ConversationWindow = ({ conversation, toneResult }) => (
  <div className={classes.container}>
    <TitleBar
      name={formatName(conversation)}
      id={conversation.conversation}
      sentiment="Positive"
    />
    <div className={classes.chatWrapper}>
      <ChatBox
        log={conversation.logs}
        time={moment(conversation.date).format(timeFormat)}
      />
      <ToneBox toneResult={toneResult} />
    </div>
    <ToneHistory toneResult={toneResult} />
  </div>
);

ConversationWindow.propTypes = {
  conversation: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    lastContext: PropTypes.shape({
      fname: PropTypes.string,
      lname: PropTypes.string,
    }).isRequired,
  }).isRequired,
  toneResult: PropTypes.array.isRequired,
};

export default ConversationWindow;