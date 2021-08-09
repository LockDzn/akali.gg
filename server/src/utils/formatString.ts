export function formatSummonerName(name: String) {
  const result = name.replace(/\s/g, '').toLowerCase()
  return result
}
