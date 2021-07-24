import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from 'styled-components'

//const CodeBlock = {
export const CodeBlock = (props) => {
    const {
      inline, className, children
    } = props;
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter 
          style={atomDark}
          language={match[1]}
          PreTag="div"
          showLineNumbers
          wrapLines
          children={String(children).replace(/\n$/, '')}
          customStyle={{
            backgroundColor: "transparent"
          }}
          {...props} />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
}

export const H1Custom = styled.h1`
  color: palevioletred;
  font-family: 'Work Sans', sans-serif;
`

export const H2Custom = styled.h2`
  color: palevioletred;
  font-family: 'Work Sans', sans-serif;
`

export const H3Custom = styled.h3`
  color: palevioletred;
  font-family: 'Work Sans', sans-serif;
`

export const ACustom = styled.a`
  color: palevioletred;
  &:hover {
    background: orange;
    color: black;
  }
`

export const ImgCustom = styled.img`
  display:block;
  margin:auto;
  border-radius: 20px;
  max-width: 100%;
  max-height: 100%;
  transition:transform 0.25s ease;

  &:active {
   position: relative;
   top: 50%;
   left: 50%;
    -webkit-transform:scale(2); /* or some other value */
    transform:scale(2);
  }
`
