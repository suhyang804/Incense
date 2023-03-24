import styled from "styled-components";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";

const ProfilePerfumeHeader = styled(FlexDiv)`
  height: 9.5rem;
  background-image: url("/assets/images/bgimg1.png");
  background-position: 0% 70%;
  background-size: cover;
`;

const ProfilePerfumeContentContainer = styled(FlexDiv)`
  & > * {
    align-self: flex-start;
  }
`;

export { ProfilePerfumeHeader, ProfilePerfumeContentContainer };
