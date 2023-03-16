import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import "dayjs/locale/ko";
import CheckboxWithIcon from "../../components/common/CheckboxWithIcon/CheckboxWithIcon";
import CheckboxPickOne from "../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan } from "../LogInPage/style";
import { SignUpInput, SignUpItem, SignUpSpan, SignUpMsg } from "./style";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
// dayjs.locale("ko");

const SignUpPage = () => {
  // 값 저장할 state
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [genderPickedIdx, setGenderPickedIdx] = useState(null);

  // validation 관련 state
  const [nameChecked, setNameChecked] = useState(false);
  const [nameMsg, setNameMsg] = useState("test");
  const [birthMsg, setBirthMsg] = useState(
    "YYYYMMDD 형식의 8자리로 입력해주세요"
  );
  const [isError, setIsError] = useState({ name: false, birth: false });

  const checkBirth = (date) => {
    const year = +date.slice(0, 4);
    const month = +date.slice(4, 6);
    const day = +date.slice(6, 8);

    if (
      !dayjs(date, "YYYYMMDD", true).isValid() ||
      dayjs(date).toDate() > new Date() ||
      year < dayjs().year() - 100 ||
      month > 12 ||
      day > 31
    ) {
      setBirthMsg("유효하지 않은 생년월일입니다");
      // setIsError((prev) => {
      //   return { ...prev, birth: true };
      // });
    }

    console.log("aaa");
    console.log(!dayjs(date, "YYYYMMDD", true).isValid());
    console.log(dayjs(date).toDate() > new Date());
    console.log(year < dayjs().year() - 100);
    console.log(month > 12);
    console.log(day > 31);

    // const newDate = dayjs(date).format("YYYY.MM.DD");
    // if (
    //   !dayjs(date, "YYYYMMDD", true).isValid() ||
    //   !dayjs(date).isBetween(dayjs().subtract(100, "y"), undefined)
    // ) {
    //   setBirthMsg("유효하지 않은 생년월일입니다");
    //   // setIsError((prev) => {
    //   //   return { ...prev, birth: true };
    //   // });
    // }
    // console.log(dayjs(date).subtract(100, "y"));
    // console.log(!dayjs(date, "YYYYMMDD", true).isValid());
    // console.log(
    //   !dayjs(date).isBetween(dayjs(date).subtract(100, "y"), dayjs())
    // );
  };

  useEffect(() => {
    // 형식 유효성 검사 - 차후 submit으로 옮길 것
    if (birth.length === 8) checkBirth(birth);
  }, [birth]);

  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        width="45%"
        style={{ backgroundImage: "url('/assets/images/bgimg1.png')" }}
      >
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column">
        <FlexDiv direction="column" height="35%">
          <SignUpSpan>보다 정확한 추천을 위해</SignUpSpan>
          <SignUpSpan>당신에 대해 알려주세요</SignUpSpan>
        </FlexDiv>
        <div style={{ height: "45%" }}>
          <FlexDiv
            direction="column"
            justify="start"
            align="start"
            height="auto"
          >
            <SignUpItem>
              <FlexDiv direction="column" align="start" width="auto">
                <SignUpInput
                  placeholder="닉네임을 입력해주세요"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setNameChecked(false);
                    // 길이 유효성 검사
                    if (e.target.value.length <= 20) {
                      setName(e.target.value);
                      setNameMsg("test");
                    } else {
                      setName(name.substring(0, 20));
                      setNameMsg("닉네임은 최대 20자까지 가능합니다");
                    }
                  }}
                  required
                  maxlength={20}
                />
                <SignUpMsg>{nameMsg}</SignUpMsg>
              </FlexDiv>
              <CheckboxWithIcon
                text={nameChecked ? "사용가능" : "중복검사"}
                isChecked={nameChecked ? true : false}
                funcClicked={() => setNameChecked((prev) => !prev)}
              />
            </SignUpItem>
            <SignUpItem>
              <FlexDiv direction="column" align="start" width="auto">
                <SignUpInput
                  placeholder="생년월일을 입력해주세요"
                  value={birth}
                  onChange={(e) => {
                    // 길이 유효성 검사
                    if (e.target.value.length <= 8) {
                      setBirth(e.target.value);
                      setBirthMsg("YYYYMMDD 형식의 8자리로 입력해주세요");
                    } else {
                      setBirth(birth.substring(0, 8));
                    }
                  }}
                  type="number"
                  required
                />
                <SignUpMsg>{birthMsg}</SignUpMsg>
              </FlexDiv>
              <span>토글 공개</span>
            </SignUpItem>
            <SignUpItem>
              <CheckboxPickOne
                textArr={["남성", "여성"]}
                pickedIdx={genderPickedIdx}
                setPickedIdx={setGenderPickedIdx}
                width="23rem"
                height="3rem"
                margin="0 3rem 0 0"
              />
              <span>토글 공개</span>
            </SignUpItem>
          </FlexDiv>
        </div>
        <div style={{ height: "20%" }}>
          <button type="submit">완료</button>
        </div>
      </FlexDiv>
    </FlexDiv>
  );
};

export default SignUpPage;
