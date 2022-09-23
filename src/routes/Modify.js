import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../components/Create.module.css";
import categoryImg1 from "../assets/images/category_img/exercise_1.jpg";
import categoryImg2 from "../assets/images/category_img/exercise_2.jpg";
import categoryImg3 from "../assets/images/category_img/livinghabits_1.jpg";
import categoryImg4 from "../assets/images/category_img/livinghabits_2.jpg";
import categoryImg5 from "../assets/images/category_img/livinghabits_3.jpg";
import categoryImg6 from "../assets/images/category_img/livinghabits_4.jpg";
import categoryImg7 from "../assets/images/category_img/livinghabits_5.jpg";
import categoryImg8 from "../assets/images/category_img/nodrink_1.jpg";
import categoryImg9 from "../assets/images/category_img/nosmoke_1.jpg";
import { useLocation } from "react-router-dom";
import { URL } from "../utile/URL";

function Modify() {
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [titleValue, setTitleValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [imgValue, setImgValue] = useState("");
  const [holidayValue, setHolidayValue] = useState("");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [authValue, setAuthValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [authMethodValue, setAuthMethodValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const modifyTitle = (e) => {
    setTitleValue(e.target.value);
  };
  const modifyCategory = (e) => {
    setCategoryValue(e.target.value);
  };
  const modifyImg = (e) => {
    setImgValue(e.target.value);
  };
  const modifyHoliday = (e) => {
    {
      e.target.checked ? setHolidayValue("on") : setHolidayValue("");
    }
  };
  const modifyStart = (e) => {
    setStartValue(e.target.value);
  };
  const modifyEnd = (e) => {
    setEndValue(e.target.value);
  };
  const modifyAuth = (e) => {
    setAuthValue(e.target.value);
  };
  const modifyPassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const modifyAuthMethod = (e) => {
    setAuthMethodValue(e.target.value);
  };
  const modifyContent = (e) => {
    setContentValue(e.target.value);
  };

  const challengeGet = async () => {
    const json = await axios({
      url: `${URL}/api/challenge/detail/${state}`,
      method: "GET",
    });
    const {
      challengeTitle,
      challengeCategory,
      challengeImgUrl,
      challengeHoliday,
      challengeStart,
      challengeEnd,
      challengeAuth,
      challengePassword,
      challengeAuthMethod,
      challengeContent,
    } = json.data;

    setTitleValue(challengeTitle);
    setCategoryValue(challengeCategory);
    setImgValue(challengeImgUrl);
    setHolidayValue(challengeHoliday);
    setStartValue(challengeStart);
    setEndValue(challengeEnd);
    setAuthValue(challengeAuth);
    setPasswordValue(challengePassword);
    setAuthMethodValue(challengeAuthMethod);
    setContentValue(challengeContent);
    setIsLoading(false);
    console.log(json);
  };

  useEffect(() => {
    challengeGet();
  }, []);

  const challengeUpdate = async () => {
    const data = await axios({
      url: `${URL}/api/challenge/update`,
      method: "PUT",
      data: {
        challengeId: state,
        challengeTitle: titleValue,
        challengeCategory: categoryValue,
        challengeImgUrl: imgValue,
        challengeHoliday: holidayValue,
        challengeStart: startValue,
        challengeEnd: endValue,
        challengeAuth: authValue,
        challengeAuthMethod: authMethodValue,
        challengeContent: contentValue,
        challengePassword: passwordValue,
      },
    });
  };

  let categoryImgs = [
    categoryImg1,
    categoryImg2,
    categoryImg3,
    categoryImg4,
    categoryImg5,
    categoryImg6,
    categoryImg7,
    categoryImg8,
    categoryImg9,
  ];

  // const [modal, setModal] = useState(false);
  const [imgBox, setImgBox] = useState(false);
  const [imgCheckBox, setImgCheckBox] = useState(
    Array(categoryImgs.length).fill(false)
  );
  const [imgSave, setImgSave] = useState(null);
  const [authPw, setAuthPw] = useState(null);

  // 대표이미지 열림
  function openImgBox() {
    setImgBox(!imgBox);
  }
  // 대표이미지 선택
  function imgCheck(event) {
    const newArr = Array(categoryImgs.length).fill(false);
    newArr[event.target.alt] = true;
    setImgCheckBox(newArr);
    console.log(newArr);
  }

  // 대표이미지 저장
  function inputImg(event) {
    setImgSave(event.target.src);
  }

  // 대표이미지 검사
  function passImg() {
    if (imgValue != null) {
      createCategoryImg();
      alert("이미지 선택이 완료되었습니다.");
      setImgBox(false);
    } else {
      alert("이미지를 선택해주세요.");
    }
  }

  const createCategoryImg = (e) => {
    setImgValue(imgSave);
  };

  // 챌린지 비밀번호 입력
  function inputPw(event) {
    setAuthPw(event.target.value);
  }

  // 챌린지 비밀번호 검사
  function passAuthPw() {
    if (authPw.length > 3 && 9 > authPw.length) {
      createPrivate();
      alert("비밀번호 입력이 완료되었습니다.");
    } else {
      alert("비밀번호를 4 ~ 8자로 입력해주세요.");
    }
  }

  // 챌린지 비밀번호 저장
  const createPrivate = (e) => {
    // setChallengeInfo({
    //   ...challengeInfo,
    //   challengePassword: authPw,
    // });
    setPasswordValue(authPw);
  };

  const postCheck = () => {
    if (titleValue === "") {
      alert("제목을 입력해주세요.");
    } else if (categoryValue === "" || categoryValue === "CATEGORY") {
      alert("카테고리를 설정해주세요.");
    } else if (imgValue === "") {
      alert("대표이미지를 설정해주세요.");
    } else if (startValue === "") {
      alert("인증시작을 설정해주세요.");
    } else if (endValue === "") {
      alert("인증종료를 설정해주세요.");
    } else if (authValue === "" || authValue === "CATEGORY") {
      alert("모집방식을 설정해주세요.");
    } else if (authValue === "PRIVATE" && passwordValue === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (authMethodValue === "") {
      alert("인증방법을 입력해주세요.");
    } else if (contentValue === "") {
      alert("챌린지 설명을 입력해주세요.");
    } else {
      alert("챌린지가 수정되었습니다.");
      challengeUpdate();
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.create_container}>
      <h1 className={styles.title}>챌린지 수정</h1>
      <div className={styles.create_form}>
        <div className={styles.create_box}>
          <div className={styles.create_left}>
            <div>
              <label>제목</label>
              <input
                type="text"
                value={titleValue}
                placeholder="챌린지의 제목을 입력해주세요."
                className={styles.create_css}
                onChange={modifyTitle}
              />
            </div>
            <div className={styles.select_box}>
              <label>카테고리</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  value={categoryValue}
                  onChange={modifyCategory}
                >
                  <option value="CATEGORY">주제</option>
                  <option value="NODRINK">금주</option>
                  <option value="NOSMOKE">금연</option>
                  <option value="EXERCISE">운동</option>
                  <option value="LIVINGHABITS">생활습관</option>
                </select>
              </div>
            </div>
            <div className={styles.create_img}>
              <label>대표 이미지 선택</label>
              <button
                className={styles.create_css}
                onClick={openImgBox}
                type="button"
              >
                {imgValue === ""
                  ? "이미지 선택"
                  : "이미지 선택이 완료되었습니다."}
              </button>
              <div
                className={`${styles.create_img_box} ${
                  imgBox === true ? styles.create_box_open : ""
                } `}
              >
                <h3>대표 이미지 설정</h3>
                <ul>
                  {categoryImgs.map((categoryImg, index) => (
                    <li
                      key={index}
                      onClick={imgCheck}
                      className={`${
                        imgCheckBox[index] === true ? styles.select_img : ""
                      } `}
                    >
                      <img src={categoryImg} alt={index} onClick={inputImg} />
                    </li>
                  ))}
                </ul>
                <button className={styles.create_btn} onClick={passImg}>
                  대표 이미지로 설정하기
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>인증 기간 중 주말제외 여부</label>
              <div className={`${styles.holiday} ${styles.create_css}`}>
                <label>주말 제외</label>
                {holidayValue == "on" ? (
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={modifyHoliday}
                    value={holidayValue || ""}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onChange={modifyHoliday}
                    value={holidayValue || ""}
                  />
                )}
              </div>
            </div>
            <div className={styles.create_date}>
              <label>인증기간</label>
              <div>
                <input
                  type="date"
                  className={styles.create_css}
                  value={startValue}
                  onChange={modifyStart}
                />
                <span> ~ </span>
                <input
                  type="date"
                  className={styles.create_css}
                  value={endValue}
                  onChange={modifyEnd}
                />
              </div>
            </div>
            <div className={styles.select_box}>
              <label>모집 방식</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  value={authValue}
                  onChange={modifyAuth}
                >
                  <option value="CATEGORY">공개여부 설정</option>
                  <option value="PUBLIC">공개</option>
                  <option value="PRIVATE">
                    {passwordValue === ""
                      ? "비공개"
                      : "비밀번호 설정이 완료되었습니다."}
                  </option>
                </select>
              </div>
            </div>
            <div
              className={`${styles.private_box} ${
                authValue === "PRIVATE" ? styles.private_box_open : ""
              } `}
            >
              <h3>챌린지의 비밀번호를 입력해주세요.</h3>
              <p>비밀번호는 4 ~ 8자 입력 가능합니다.</p>
              <input
                className={styles.create_css}
                type="password"
                minLength="4"
                maxLength="8"
                onChange={inputPw}
              />
              <button
                className={styles.create_btn}
                onClick={passAuthPw}
                type="button"
              >
                비밀번호 입력
              </button>
            </div>
          </div>
        </div>
        <div className={styles.create_bottom}>
          <label>인증방법</label>
          <input
            type="text"
            className={styles.create_css}
            value={authMethodValue}
            onChange={modifyAuthMethod}
          />
        </div>
        <div className={styles.create_bottom}>
          <label>챌린지 설명</label>
          <textarea
            className={styles.create_css}
            value={contentValue}
            onChange={modifyContent}
          />
        </div>
      </div>
      <button onClick={postCheck} className={styles.create_btn}>
        챌린지 수정하기
      </button>
    </div>
  );
}

export default Modify;
