const weatherApi = 'https://api.weather.gov/alerts/active?area='

function fetchWeatherAlerts(stateAbbr) {
  const inputField = document.getElementById('state-input')
  const errorContainer = document.getElementById('error-message')
  const alertsDisplay = document.getElementById('alerts-display')
  const cleanState = stateAbbr.trim().toUpperCase()

  errorContainer.textContent = ''
  errorContainer.classList.add('hidden')
  alertsDisplay.innerHTML = ''
  inputField.value = ''

  fetch(`${weatherApi}${cleanState}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not find weather data for that state.')
      }
      return response.json()
    })
    .then(data => displayAlerts(data))
    .catch(error => {
      errorContainer.textContent = error.message
      errorContainer.classList.remove('hidden')
    })
}

function displayAlerts(data) {
  const alertsDisplay = document.getElementById('alerts-display')
  const featuresList = Array.isArray(data.features) ? data.features : []
  const summaryText = document.createElement('h3')
  summaryText.textContent = `Weather Alerts: ${featuresList.length}`
  alertsDisplay.appendChild(summaryText)

  if (featuresList.length === 0) {
    const noAlertsText = document.createElement('p')
    noAlertsText.textContent = 'No active alerts for this state.'
    alertsDisplay.appendChild(noAlertsText)
    return
  }

  const bulletList = document.createElement('ul')
  featuresList.forEach(alertItem => {
    const listItem = document.createElement('li')
    listItem.textContent = alertItem.properties.headline
    bulletList.appendChild(listItem)
  })
  alertsDisplay.appendChild(bulletList)
}

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('state-input')
  const fetchButton = document.getElementById('fetch-alerts')

  fetchButton.addEventListener('click', () => {
    fetchWeatherAlerts(inputField.value)
  })
})