export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occured while fetching data");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const fetcherToken = async (url, token) => {
  const bearer = "Bearer " + token;
  const res = await fetch(url, {
      
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = new Error("An error occured while fetching data");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};
