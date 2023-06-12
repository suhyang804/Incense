import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import "dayjs/locale/ko";
import CheckboxWithIcon from "../../components/common/CheckboxWithIcon/CheckboxWithIcon";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan } from "../LogInPage/style";
import SignUpItem from "../../components/SignUpItem/SignUpItem";
import { SignUpItemWrapper, SignUpSpan } from "./style";
import api from "../../apis/api";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
// dayjs.locale("ko");

const SignUpPage = () => {
  const navigate = useNavigate();
  const { email, type } = useLocation().state;

  // 값 저장할 state
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [genderPickedIdx, setGenderPickedIdx] = useState(null);

  console.log(name, birth, genderPickedIdx);
  console.log(dayjs(birth, "YYYYMMDD").format("YYYY-MM-DD"));

  // validation 관련 state
  const [nameChecked, setNameChecked] = useState(false);
  const [nameMsg, setNameMsg] = useState("20자 이하의 닉네임을 입력해주세요");
  const [birthMsg, setBirthMsg] = useState(
    "YYYYMMDD 형식의 8자리로 입력해주세요"
  );
  // const [inputMsg, setInputMsg] = useState({ name: "", birth: "" });

  const [isError, setIsError] = useState({ name: false, birth: false });

  // 닉네임 유효성 검사
  const checkName = () => {
    setNameChecked(true);
    setNameMsg("");
  };

  // 생년월일 유효성 검사
  const checkBirth = (date) => {
    const year = +date.slice(0, 4);
    const month = +date.slice(4, 6);
    const day = +date.slice(6, 8);

    if (
      !dayjs(date, "YYYYMMDD", true).isValid() || // isValid가 false거나
      dayjs(date).toDate() > new Date() || // 오늘 이후 날짜이거나
      year < dayjs().year() - 100 || // 오늘 기준 100년보다 더 이전이거나
      month > 12 || // month값이 12를 초과하거나
      day > 31 // day값이 31을 초과할 경우
    ) {
      setBirthMsg("유효하지 않은 생년월일입니다");
    } else if (genderPickedIdx === null) {
      setIsError((prev) => {
        return { ...prev, birth: true };
      });
      // setMsg("birth", "error", "유효하지 않은 생년월일입니다");
    } else {
      setBirthMsg(" ");
      setIsError((prev) => {
        return { ...prev, birth: false };
      });

      //web socket 연결
      // dispatch({ type: "START_WEBSOCKET" });

      // accessToken 리덕스에 저장
      dispatch(login({ accessToken: res.accessToken, nickname: res.nickname }));

      // 홈으로 이동
      navigate("/");
      // navigate(-1, { replace: true });
    }

    console.log("aaa");
    console.log(!dayjs(date, "YYYYMMDD", true).isValid());
    console.log(dayjs(date).toDate() > new Date());
    console.log(year < dayjs().year() - 100);
    console.log(month > 12);
    console.log(day > 31);
  };

  const fetchPostMemberInfo = async (name, birth, genderPickedIdx) => {
    await api.user.register({
      alarmOpen: 1,
      birth: birth,
      birthOpen: 1,
      email: email,
      // gender: genderPickedIdx,
      gender: 1,
      genderOpen: 1,
      nickname: name,
      type: type,
    });

    // accessToken 리덕스에 저장

    // 홈으로 이동
    navigate("/");
    // navigate(-1, { replace: true });
  };

  useEffect(() => {
    // 생년월일 형식 유효성 검사 - 차후 submit으로 옮길 것
    if (birth.length === 8) checkBirth(birth);
    else
      setIsError((prev) => {
        return { ...prev, birth: false };
      });
  }, [birth]);

  useEffect(() => {
    setNameChecked(false);
  }, [name]);

  // input종류, 상태, 메시지를 받아 input 하단 메시지를 설정
  // const setMsg = (type, status, msg) => {
  //   setInputMsg((prev) => {
  //     const newInputMsg = {};
  //     const key = `${type}`;
  //     return {
  //       ...prev,
  //       key: msg,
  //     };
  //   });
  //   console.log(inputMsg);
  // };

  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        width="45%"
        style={{
          backgroundImage: "url('/assets/images/bgimg1.png')",
          backgroundSize: "cover",
        }}
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
            <SignUpItemWrapper>
              <SignUpItem
                type="name"
                inputValue={name}
                setInputValue={setName}
                setNameChecked={setNameChecked}
                msg={nameMsg}
                setMsg={setNameMsg}
              />
              <CheckboxWithIcon
                text={nameChecked ? "사용가능" : "중복검사"}
                isChecked={nameChecked ? true : false}
                funcClicked={() => checkName()}
              />
            </SignUpItemWrapper>
            <SignUpItemWrapper>
              <SignUpItem
                type="birth"
                inputValue={birth}
                setInputValue={setBirth}
                msg={birthMsg}
                setMsg={setBirthMsg}
                isError={isError}
              />
              <span>토글 공개</span>
            </SignUpItemWrapper>
            <SignUpItemWrapper>
              <SignUpItem
                type="gender"
                genderPickedIdx={genderPickedIdx}
                setGenderPickedIdx={setGenderPickedIdx}
                msg={""}
              />
              <span style={{ paddingBottom: "1.25rem" }}>토글 공개</span>
            </SignUpItemWrapper>
          </FlexDiv>
        </div>
        <div style={{ height: "20%" }}>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              fetchPostMemberInfo(
                name,
                dayjs(birth).format("YYYY-MM-DD"),
                genderPickedIdx
              );
            }}
          >
            완료
          </button>
        </div>
      </FlexDiv>
    </FlexDiv>
  );
};

export default SignUpPage;
