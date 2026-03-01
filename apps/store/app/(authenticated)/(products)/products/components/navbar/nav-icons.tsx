"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

export function NavIcons() {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="30"
        viewBox="0 0 472 549"
      >
        <g id="Group_1" data-name="Group 1" transform="translate(-447 -126)">
          <path
            id="Path_1"
            data-name="Path 1"
            d="M919,420l-198.581-1.348V675H645.39V418.652L447,419l.234-75.377h145.15L482,233q12.523-13.842,25.078-27.651Q519.522,191.661,532,178q56.7,56.261,113.39,112.52L645,126c6.154.591,15.556,1.276,27.172,1.228,4.6-.019,7.714-.145,10.7-.241,8.422-.27,20.8-.457,37.124.013q.21,81.761.419,163.52L834,177q11.955,14.029,24.73,28.349Q871.453,219.6,884,233L773.424,343.623H918.575Z"
            fill="#137771"
          />
        </g>
      </svg>

      <Navigation>
        <ChevronLeft size={20} />
        <ChevronRight size={20} />
      </Navigation>
    </Wrapper>
  );
}
