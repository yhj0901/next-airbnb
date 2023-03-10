import React, { useState } from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import { monthList, dayList, yearList } from '../../lib/staticData';
import Selector from '../common/Selector';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { commonActions } from '../../store/common';
import useValidateMode from '../../hooks/useValidateMode';

const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthdat-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  /**
   * ???????????? ??? ?????? ???
   */
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  /**
   * ???????????? ??? ?????? ???
   */
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  /**
   * ???????????? ??? ?????? ???
   */
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  /**
   * ???????????? ?????? ????????????
   */
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  /**
   * ????????? ?????? ?????? ???
   */
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  /**
   * ?????? ?????? ???
   */
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  /**
   * ??? ?????? ???
   */
  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  /**
   * ??? ?????? ???
   */
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  /**
   * ???????????? ??? ????????????
   */
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    if (!email || !lastName || !!firstName || !password) {
      return undefined;
    }

    try {
      const signUpBody = {
        email,
        lastName,
        firstName,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace('???', '')}-${birthDay}`
        ).toISOString(),
      };

      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="mordal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="????????? ??????"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="???????????? ???????????????."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="??????(???: ??????)"
          icon={<PersonIcon />}
          value={lastName}
          onChange={onChangeLastName}
          useValidation
          isValid={!!lastName}
          errorMessage="????????? ???????????????."
        />
      </div>

      <div className="input-wrapper">
        <Input
          placeholder="???(???: ???)"
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
          useValidation
          isValid={!!firstName}
          errorMessage="?????? ???????????????."
        />
      </div>

      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="???????????? ????????????"
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          useValidation
          isValid={!!password}
          errorMessage="??????????????? ???????????????."
        />
      </div>

      <p className="sign-up-birthdat-label">??????</p>
      <p className="sign-up-modal-birthday-info">
        ??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????. ????????? ??????
        ??????????????? ??????????????? ???????????? ????????????.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['???']}
            defaultValue="???"
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['???']}
            defaultValue="???"
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['???']}
            defaultValue="???"
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">????????????</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
