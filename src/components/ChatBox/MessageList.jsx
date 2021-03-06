import React from 'react';
import { CardMedia, CardText } from 'material-ui/Card';
import classes from './ChatBox.scss';

const MessageList = (props) => (
  <CardMedia>
    <CardText>
      <ul className={classes.messageList}>
        {props.log.map((message, i) =>
          <li key={i}>
            <p className={classes.right}>{message.inputText}</p>
            {message.responseText.map((response, j) => (
              <p key={j} className={classes.left}>{response}</p>
            ))}
          </li>
        )}
      </ul>
    </CardText>
  </CardMedia>
);

MessageList.propTypes = {
  log: React.PropTypes.arrayOf(React.PropTypes.shape({
    inputText: React.PropTypes.string.isRequired,
    responseText: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  })).isRequired,
};

export default MessageList;
