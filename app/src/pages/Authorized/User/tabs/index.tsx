import { FriendsTab } from './friends.tab'
import { HomeTab } from './home.tab'
import { HistoricTab } from './historic.tab'

interface Props {
  tab: string
}

export function Tabs({ tab }: Props) {
  if (tab.toLocaleLowerCase() === 'friends') {
    return <FriendsTab />
  }

  if (tab.toLocaleLowerCase() === 'historic') {
    return <HistoricTab />
  }

  return <HomeTab />
}
