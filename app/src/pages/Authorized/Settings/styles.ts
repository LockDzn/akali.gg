import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  text-align: start;

  h3 {
    font-size: 1.5rem;
    text-align: start;
  }
`

export const Filds = styled.div`
  width: 35rem;

  .settingsFild {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8rem;

    border-bottom: 1px solid ${(props) => props.theme.color.graySecondary};

    padding-bottom: 0.8rem;
    margin: 1.5rem 0;

    font-size: 0.8rem;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .fildName {
        width: 100%;
        font-weight: 700;
      }

      .fildContent {
        color: ${(props) => props.theme.color.gray};
      }

      .fildAction {
        background: none;
        color: ${(props) => props.theme.color.white};
        border: none;
        font-weight: 400;
      }

      .profileIcon {
        width: 105px;
        height: 105px;
      }

      .actions {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
          width: 32px;
        }
      }
    }
  }
`

export const ImageFile = styled.div`
  margin-top: 1rem;
  input {
    display: none;
  }

  label {
    display: block;

    cursor: pointer;

    p {
      width: 10rem;
      color: ${(props) => props.theme.color.white};
      border: 1px solid ${(props) => props.theme.color.white};

      font-weight: 400;
      font-size: 16px;
      text-align: center;

      padding: 0.3rem;
    }

    .fileSelected {
      display: block;
      font-size: 16px;
      color: ${(props) => props.theme.color.gray};
    }
  }
`
