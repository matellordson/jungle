"use client";
import styled from "styled-components";
import { Input } from "../../../../../../../components/input";
import { TextArea } from "../../../../../../../components/textarea";
import { SelectInput } from "../../../../../../../components/select";
import { Tags } from "../../../../../../../components/tag";
import Logo from "../../logo";
import { category } from "./categories";
import { Button } from "../../../../../../../components/button";
import { useState } from "react";

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
  const [productName, setProductName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log({
            productName: productName,
            tagline: tagline,
            description: description,
          });
        }}
      >
        <FormItem>
          <Input
            placeholder="Product name"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Input
            placeholder="Tagline / short description"
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <TextArea
            placeholder="Full description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormItem>
        <input />
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
