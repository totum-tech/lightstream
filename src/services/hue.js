export const login = ({ onSuccess, onError }) => (ipAddress, username) =>
  fetch(`http://${ipAddress}/api`, {
    method: 'POST',
    body: JSON.stringify({ devicetype: `reacthue#${username}` }),
  })
  .then(response => response.json())
  .then(json => {
    if (json[0].success) {
      return onSuccess(json[0].success);
    } else {
      return onError(json[0].error);
    }
  })
  .catch(onError);
