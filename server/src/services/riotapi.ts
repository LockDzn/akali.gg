import axios from 'axios'

const api = axios.create({
  baseURL: 'https://br1.api.riotgames.com/',
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  },
})

type SummonerUserProps = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export async function getSummonerByName(name: String) {
  const formattedName = name.replace(/\s/g, '').toLowerCase()
  const response = await api.get(
    `/lol/summoner/v4/summoners/by-name/${formattedName}`
  )

  return response.data as SummonerUserProps
}

export async function getThirdPartyCode(name: String) {
  const summoner = await getSummonerByName(name)

  try {
    const response = await api.get(
      `/lol/platform/v4/third-party-code/by-summoner/${summoner.id}`
    )

    return {
      status: 200,
      code: response.data,
    }
  } catch (err) {
    return {
      status: err.status,
      code: null,
    }
  }
}
