import React, { useEffect, useState } from 'react'

import api from '../../../services/api.service'
import { useAuth } from '../../../hooks/useAuth'

import { Button } from '../../../components/Button'
import { Layout } from '../../../components/Layout'

import LoadingSvg from '../../../assets/loading.svg'

import { Container, Filds, ImageFile } from './styles'

export function Settings() {
  return (
    <Layout disableSidebar>
      <Container>
        <Filds>
          <h3>Sua conta</h3>
          <div className="fields">
            <div className="settingsFild">
              <label className="fildName">Name</label>
              <div className="content">
                <span className="fildContent">LoockDzn</span>
                <button className="fildAction" type="button">
                  Editar
                </button>
              </div>
            </div>
            <div className="settingsFild">
              <label className="fildName">Email</label>
              <div className="content">
                <span className="fildContent">email@gmail.com</span>
                <button className="fildAction" type="button">
                  Editar
                </button>
              </div>
            </div>

            <UserProfileSetting />
          </div>
        </Filds>
      </Container>
    </Layout>
  )
}

function UserProfileSetting() {
  const [editProfile, setEditProfile] = useState(false)
  const [sendingImage, setSendingImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | undefined>()
  const [preview, setPreview] = useState<string>()

  const { user } = useAuth()

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  function onChangeProfile(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedImage(undefined)
      return
    }

    setSelectedImage(event.target.files[0])
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedImage) return

    const data = new FormData()

    data.append('file', selectedImage, selectedImage.name)

    try {
      setSendingImage(true)
      await api.put('/me/avatar', data)
      window.location.reload(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="settingsFild">
      <label className="fildName">Foto de perfil</label>
      {editProfile ? (
        <div className="content">
          <span className="fildContent">
            <form onSubmit={handleSubmit}>
              {preview ? (
                <img className="profileIcon" src={preview} alt="" />
              ) : (
                <img className="profileIcon" src={user?.icon} alt="" />
              )}
              <p>Recomendado imagem de 98x98.</p>
              <ImageFile>
                <input
                  accept="image/png, image/jpeg"
                  type="file"
                  id="profile"
                  onChange={onChangeProfile}
                />
                <label htmlFor="profile">
                  <p>Selecionar arquivo</p>
                  <span className="fileSelected">
                    {selectedImage
                      ? selectedImage.name
                      : 'Nenhum arquivo selecionando.'}
                  </span>
                </label>
              </ImageFile>

              <div className="actions">
                {!sendingImage ? (
                  <>
                    <Button type="submit">Salvar</Button>
                    <Button
                      type="button"
                      onClick={() => setEditProfile(false)}
                      opaque
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <img src={LoadingSvg} alt="" />
                )}
              </div>
            </form>
          </span>
        </div>
      ) : (
        <div className="content">
          <span className="fildContent"></span>
          <button
            className="fildAction"
            onClick={() => setEditProfile(true)}
            type="button"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  )
}
