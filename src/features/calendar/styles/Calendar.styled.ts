import styled from "styled-components";

export const Wrapper = styled.div<any>`
  height: 99vh;
`;

export const StyledTask = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  color: white;
  text-align: left !important;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 13px;
  cursor: move;
  text-transform: capitalize;
`;


export const StyledHoliday = styled.span<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  color: white;
  text-align: left !important;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 13px;
  cursor: move;
  text-transform: capitalize;
`;

export const SevenColGrid = styled.div<any>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${(props) => props.fullheight && `height: calc(100% - 136px);`}
  ${(props) =>
      props.fullheight &&
      `grid-template-rows: repeat(${props.rows}, 1fr);`}
  div {
    display: grid;
    border: 1px solid;
    position: relative;
    ${StyledTask} {
      display: none;
    }
    ${StyledTask}:nth-child(-n + 6) {
      display: block;
    }

    button[aria-label="add task"] {
      display: none;
    }

    &:hover {
      button[aria-label="add task"] {
      display: revert;
      z-index: 100;
      background: olive;
      color: black;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

    span {
      text-align: center;
      padding-inline: 15px;
      height: fit-content;
    }

    span.active {
      background-color: pink;
      border-bottom: 2px solid red;
      position: relative;
    }
    span.active::before {
      content: "Today ";
      font-size: 14px;
    }
  }
`;

export const HeadDays = styled.span`
  text-align: center;
  border: 1px solid;
  height: 30px;
  padding: 5px;
  background: rgba(0 0 0/0.7);
  color: white;
`;

export const DateControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 10px 0;
  align-items: center;
`;

export const SeeMore = styled.p`
  font-size: 12px;
  padding: 0 5px;
  margin-bottom: 0;
  cursor: pointer;
`;

export const ModalWrapper = styled.div`
  background: white;
  position: absolute;
  width: 45%;
  top: 50%;
  left: 50%;
  border-radius: 6px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 20px black;
  padding: 55px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 3rem;
  }

  p {
    margin-bottom: 15px;
  }

  button[aria-label="close"] {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: lightblue;
  }
`;
