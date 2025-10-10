import styled from "styled-components";

export const Paragraph = styled.p<{ $positon?: "start" | "center" | "end" }>`
  text-align: ${(props) =>
    props.$positon == "start"
      ? "start"
      : props.$positon == "center"
        ? "center"
        : props.$positon == "end"
          ? "end"
          : "start"};
`;
