const getBasepath = (ipAddress, token) =>
`http://${ipAddress}/api/${token}`

const deserializeBulbs = ({ ipAddress, token }) => bulbsById =>
  Object.keys(bulbsById).reduce((deserialized, id) => {
    const { state, name, ...meta } = bulbsById[id];
    return {
      ...deserialized,
      [id]: ({
        id,
        name,
        power: state.on,
        effect: state.effect,
        brightness: state.bri,
        saturation: state.sat,
        temperature: state.temp,
        transitionTime: state.transitiontime,
        alert: state.alert,
        meta,
        links: {
          updateState: `${getBasepath(ipAddress, token)}/lights/${id}/state`,
        },
      }),
    };
  }, {});

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

export const lights = {
  list: ({ onSuccess, onError }) => (ipAddress, token) =>
    fetch(`http://${ipAddress}/api/${token}/lights`)
    .then(response => response.json())
    .then(deserializeBulbs({ ipAddress, token }))
    .then(onSuccess)
    .catch(onError),
};

export const light = {
  set: ({ onSuccess, onError }) => (endpoint, updates) =>
    fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
    .then(response => response.json())
    .then(onSuccess)
    .catch(onError),
};
