import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Sono&family=Source+Sans+3:ital,wght@0,400;1,400;1,600;1,700&display=swap");
html,
body,
#root,
.app,
.content {
  height: 100%;
  width: 100%;
  font-family: "Source Sans 3", sans-serif;
  color: #e0e0e0;
}

.app {
  display: flex;
  position: relative;
}

::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #e0e0e0;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}
/* handle hover */
::-webkit-scrollbar-track :hover{
  background: #555;
}
`;

export default GlobalStyles;