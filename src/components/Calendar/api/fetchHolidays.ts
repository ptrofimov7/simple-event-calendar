const API_URL = 'https://date.nager.at/api/v3/PublicHolidays'

export default async function fetchHolidays(year: number) {

   const response = await fetch(`${API_URL}/${year}/ua`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
      },
    })

    return await response.json()

}