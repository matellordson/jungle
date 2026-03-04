"use client";
import styled from "styled-components";
import { Input } from "../../../../../../../components/input";
import { TextArea } from "../../../../../../../components/textarea";

const Wrapper = styled.div`
  padding: 30px 0;
`;

const StageTitle = styled.p`
  font-size: 40px;
  color: var(--text-dark);
  font-weight: 500;
`;

const StageDesc = styled.p`
  font-size: 17px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label``;

export function Identity() {
  return <Wrapper>Identity </Wrapper>;
}
