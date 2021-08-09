import { MdRemoveRedEye } from 'react-icons/md'

import {
  Container,
  Feed,
  FeedPost,
  RightSidebar,
  Friend,
  Streams,
  Creator,
} from './styles'

import { Layout } from '../../../components/Layout'

import AkaliIcon from '../../../assets/icons/akali.png'
import AkaliImage from '../../../assets/akali-background.jpg'

export function Home() {
  return (
    <Layout>
      <Container>
        <Feed>
          <Streams>
            <Creator href="https://twitch.tv/nuloki_" target="_blank">
              <img src={AkaliImage} alt="" />
              <div className="info">
                <span className="name">nuLoki_</span>
                <span className="views">
                  <MdRemoveRedEye />
                  100
                </span>
              </div>
            </Creator>
          </Streams>
          <FeedPost>
            <div className="author">
              <img
                className="user-image"
                src={AkaliIcon}
                alt="Author profile"
              />
              <div className="name">
                <strong>Akali.gg</strong>
                <span>1 dia atrás</span>
              </div>
            </div>
            <p className="post-text">
              🎯 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ducimus sapiente doloribus maxime ab inventore suscipit recusandae
              consectetur quasi eum fugiat sit, ad quod mollitia libero minima
              voluptatum unde enim qui.
            </p>
            <img className="post-image" src={AkaliImage} alt="Post" />
          </FeedPost>
          <FeedPost>
            <div className="author">
              <img
                className="user-image"
                src={AkaliIcon}
                alt="Author profile"
              />
              <div className="name">
                <strong>Akali.gg</strong>
                <span>1 dia atrás</span>
              </div>
            </div>
            <p className="post-text">
              🎯 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ducimus sapiente doloribus maxime ab inventore suscipit recusandae
              consectetur quasi eum fugiat sit, ad quod mollitia libero minima
              voluptatum unde enim qui.
            </p>
            <img className="post-image" src={AkaliImage} alt="Post" />
          </FeedPost>
          <FeedPost>
            <div className="author">
              <img
                className="user-image"
                src={AkaliIcon}
                alt="Author profile"
              />
              <div className="name">
                <strong>Akali.gg</strong>
                <span>1 dia atrás</span>
              </div>
            </div>
            <p className="post-text">
              🎯 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ducimus sapiente doloribus maxime ab inventore suscipit recusandae
              consectetur quasi eum fugiat sit, ad quod mollitia libero minima
              voluptatum unde enim qui.
            </p>
            <img className="post-image" src={AkaliImage} alt="Post" />
          </FeedPost>
        </Feed>
        <RightSidebar>
          <div className="field">
            <div className="title">Amigos</div>
            <div className="content">
              <Friend>
                <img src={AkaliIcon} alt="" />
                <div className="friend-info">
                  <span className="name">LoockDzn</span>
                  <span className="status">Online</span>
                </div>
              </Friend>
              <Friend>
                <img src={AkaliIcon} alt="" />
                <div className="friend-info">
                  <span className="name">LoockDzn</span>
                  <span className="status">Online</span>
                </div>
              </Friend>
              <Friend>
                <img src={AkaliIcon} alt="" />
                <div className="friend-info">
                  <span className="name">LoockDzn</span>
                  <span className="status">Online</span>
                </div>
              </Friend>
            </div>
            <div className="footer">
              <a href="/me/friends">Mostar mais</a>
            </div>
          </div>
        </RightSidebar>
      </Container>
    </Layout>
  )
}
