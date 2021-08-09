import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
`

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0 auto;
  margin-top: 2rem;
`

export const Streams = styled.div``

export const Creator = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.5rem;
  border-radius: 4px;

  background: ${(props) => props.theme.color.black};
  color: ${(props) => props.theme.color.white};

  text-decoration: none;

  img {
    width: 82px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-weight: 700;
    }

    .views {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      font-size: 14px;
      color: ${(props) => props.theme.color.gray};
    }
  }
`

export const FeedPost = styled.div`
  background: ${(props) => props.theme.color.black};
  border-radius: 4px;

  padding: 0.8rem;
  width: 30rem;

  cursor: pointer;

  .author {
    display: flex;
    align-items: center;
    gap: 1rem;

    .user-image {
      width: 50px;
      border-radius: 50px;
    }

    .name {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 18px;
      }

      span {
        font-size: 14px;
        color: ${(props) => props.theme.color.gray};
      }
    }
  }

  .post-text {
    margin: 1rem 0;
  }

  .post-image {
    width: 100%;
  }
`

export const RightSidebar = styled.div`
  margin-right: 2rem;

  .field {
    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 0.8rem 0;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.8rem;

      background: ${(props) => props.theme.color.black};
      margin-left: auto;

      padding: 0.8rem;
      width: 15rem;
    }

    .footer {
      background: ${(props) => props.theme.color.black};
      border-top: 1px solid ${(props) => props.theme.color.graySecondary};
      padding: 0.5rem 0.8rem;

      a {
        text-decoration: none;
        color: ${(props) => props.theme.color.white};

        transition: all 300ms ease-in;

        &:hover {
          color: ${(props) => props.theme.color.pink};
        }
      }
    }
  }
`

export const Friend = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 48px;
    border-radius: 48px;
  }

  .friend-info {
    display: flex;
    flex-direction: column;

    .status {
      font-size: 12px;
      color: ${(props) => props.theme.color.gray};
    }
  }
`
