export const updateImage = (game, imageId) => {
  const data = { ...game, imageUrl: imageId };
  console.log(JSON.stringify(data));
  return fetch(`https://localhost:44390/api/games/${game.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
