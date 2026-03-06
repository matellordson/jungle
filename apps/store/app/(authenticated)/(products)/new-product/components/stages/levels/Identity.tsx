"use client";
import styled from "styled-components";
import { Input } from "../../../../../../../components/input";
import { TextArea } from "../../../../../../../components/textarea";
import { SelectInput } from "../../../../../../../components/select";
import { Tags } from "../../../../../../../components/tag";
import Logo from "../../logo";
import { category } from "./categories";

const Wrapper = styled.div`
  padding: 30px 3px;
  max-width: 500px;
  margin: auto;
`;

const StageIntro = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const StageTitle = styled.div`
  font-size: 30px;
  color: var(--text-dark);
  display: flex;
  align-items: start;
  gap: 10px;
  justify-content: center;
`;

const StageDesc = styled.p`
  font-size: 14px;
  padding-top: 5px;
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

export function Identity() {
  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>
          <Logo />
          Let's add your product
        </StageTitle>
        <StageDesc>
          You can save your progress and come back at any point.
        </StageDesc>
      </StageIntro>
      <Form>
        <FormItem>
          <Input placeholder="Product name" />
        </FormItem>
        <FormItem>
          <Input placeholder="Tagline / short description" />
        </FormItem>
        <FormItem>
          <TextArea placeholder="Full description" />
        </FormItem>
        {/* <FormItem>
          <SelectInput options={category} />
        </FormItem>
        <FormItem>
          <Tags />
        </FormItem> */}
      </Form>
    </Wrapper>
  );
}
