import React from "react";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import ProfileMainBtn from "../../../components/Profile/ProfileMainBtn/ProfileMainBtn";
import { ProfileOutletContainer } from "../ProfilePage/style";

const ProfileMainPage = () => {
  return (
    <ProfileOutletContainer>
      <FlexDiv>
        <ProfileMainBtn
          title="Perfumes"
          subTitles={["I have it", "I had it", "I want it"]}
        />
        <ProfileMainBtn
          title="Analysis"
          subTitles={["preference", "notes", "recommendation"]}
        />
        <ProfileMainBtn
          title="Activity"
          subTitles={["review", "share", "sell"]}
        />
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfileMainPage;
