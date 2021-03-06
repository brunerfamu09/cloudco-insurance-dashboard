import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import MessageList from './MessageList';
import classes from './ChatBox.scss';

const ChatBox = (props) => (
  <Card className={classes.container}>
    <CardHeader
      title={props.owner}
      subtitle={props.time}
      avatar="https://tone-analyzer-demo.mybluemix.net/images/service-icon.svg"
    />
    <MessageList log={props.log} />
  </Card>
);

ChatBox.propTypes = {
  log: React.PropTypes.array.isRequired,
  owner: React.PropTypes.string.isRequired,
  time: React.PropTypes.string,
};

export default ChatBox;
