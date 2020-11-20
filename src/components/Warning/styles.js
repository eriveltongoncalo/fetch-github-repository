import styled from 'styled-components';

export const Message = styled.div`
  display: flex;

  align-items: center;
  svg {
    color: ${(props) => props.fontColor};
    width: 18px;
    height: 18px;
    padding-right: 4px;
  }
  span {
    color: ${(props) => props.fontColor};
  }
`;
