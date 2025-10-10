import styled from "styled-components";

export const Tittle = styled.p<{
  $positon?: "start" | "center" | "end";
  $size?: "big" | "bigger" | "biggest";
}>`
  font-size: ${(props) =>
    props.$size == "big"
      ? "2rem"
      : props.$size == "bigger"
        ? "2.5rem"
        : props.$size == "biggest"
          ? "3rem"
          : "2rem"};
  text-align: ${(props) =>
    props.$positon == "start"
      ? "start"
      : props.$positon == "center"
        ? "center"
        : props.$positon == "end"
          ? "end"
          : "start"};
  font-weight: bold;
`;
