import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Message } from './styles';

export default function Warning(prop) {
  if (prop.show) {
    return (
      <Message fontColor={prop.fontColor}>
        <FaExclamationCircle />
        <span>{prop.msg}</span>
      </Message>
    );
  }

  return null;
}
