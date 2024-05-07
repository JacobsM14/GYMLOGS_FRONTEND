const urlServer = import.meta.env.API_URL;

async function postAndPutFetch(method, url, data) {
  try {
    const response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(JSON.stringify(data));
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(username, password) {
//   console.log(urlServer);
  return await postAndPutFetch("POST", "http://localhost:3000/api/users/emailandpassword", {
    email: username,
    pssd: password,
  });
}
