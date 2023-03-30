import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";

const NavWrapper = styled(FlexDiv)`
  ${({ pathname }) => css`
    display: ${pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/"
      ? "none"
      : "flex"};
    position: fixed;
    height: var(--nav-height);
    background-color: white;
    justify-content: space-between;
    z-index: 1000;
  `}
`;

const NavTitle = styled(NavLink)`
  font-family: "Federo", sans-serif;
  font-size: 24px;
  padding-left: 1rem;
`;

const NavItem = styled(NavLink)`
  padding: 0.5rem 1rem;
  font-size: 22px;
  background: linear-gradient(90deg, var(--main-color) 50%, var(--font-color) 0)
      calc(100% - var(--p, 0%)) / 200% 100%,
    linear-gradient(var(--main-color) 0 0) 0% 100% / var(--p, 0%) 0.1rem
      no-repeat;
  -webkit-background-clip: text, padding-box;
  background-clip: text, padding-box;
  transition: 0.8s;

  &.active {
    --p: 100%;
    color: var(--main-color);
  }
`;

// h1 {
//   --s: 0.1em;   /* the thickness of the line */
//   --c: #2c4bff; /* the color */

//   color: #0000;
//   padding-bottom: var(--s);
//   background:
//     linear-gradient(90deg,var(--c) 50%,#000 0) calc(100% - var(--_p,0%))/200% 100%,
//     linear-gradient(var(--c) 0 0) 0% 100%/var(--_p,0%) var(--s) no-repeat;
//   -webkit-background-clip: text,padding-box;
//           background-clip: text,padding-box;
//   transition: 0.5s;
// }
// h1:hover {--_p: 100%}

const NavLogInStatus = styled.span`
  padding: 0 1rem;
`;

export { NavWrapper, NavTitle, NavItem, NavLogInStatus };
