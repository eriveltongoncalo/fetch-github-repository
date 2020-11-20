import styled, { keyframes } from 'styled-components';
import binocular from '../../assets/binocular.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    color: #7159c1;
    width: 25px;
    height: 25px;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const LoadingMoreIssues = styled.div`
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 100px;
    border: 8px solid #e2e5ed;
    width: 40px;
    height: 40px;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    outline: none;
    background: none;

    :hover {
      transform: scale(0.65);
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      border-color: #7159c1;
      background-color: #7159c1;
    }
    span {
      display: none;
    }
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  /*margin-top: 30px;
  border-top: 1px solid #eee;*/
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      border-top: 0;
    }
    /*& + li {
      margin-top: 10px;
    }*/

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 6;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }

    .status-issue {
      flex: 1;
    }
  }
`;

export const StatusIssue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 32px;
  color: #fff;
  border: transparent;
  background-color: ${(props) =>
    props.status === 'closed' ? '#d73a49' : '#28a745'};
  border-radius: 20px;
`;

export const Form = styled.form`
  margin-top: 40px;
  position: relative;
  width: 100% !important;

  svg {
    position: absolute;
    top: 9px;
    left: 8px;
    text-align: center;
    color: #a9a9a9;
    width: 16px;
    height: 16px;
  }

  input {
    width: 100%;
    height: 32px;
    padding-left: 32px;
    border-radius: 6px;
    border: 1px solid #e1e4e8;

    :focus {
      box-shadow: 0px 0px 4px 4px #7159c1;
      opacity: 0.6;
    }
  }
`;

export const NotFoundIssues = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url(${binocular});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    margin-bottom: 4px;
  }

  p {
    font-weight: bold;
    font-size: 29px;
    margin-bottom: 18px;
  }
  p + p {
    font-size: 13px;
    color: #666;
  }
`;
