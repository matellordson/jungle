"use client";
import styled from "styled-components";
import { Input } from "../../../../../../../components/input";
import { TextArea } from "../../../../../../../components/textarea";
import { SelectInput } from "../../../../../../../components/select";
import { Tags } from "../../../../../../../components/tag";

const Wrapper = styled.div`
  padding: 30px 3px;
  max-width: 500px;
  margin: auto;
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

const category = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export function Identity() {
  return (
    <Wrapper>
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
        <FormItem>
          <SelectInput options={category} />
        </FormItem>
        <FormItem>
          <Tags />
        </FormItem>
      </Form>
    </Wrapper>
  );
}
