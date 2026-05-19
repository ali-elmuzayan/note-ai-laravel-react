export const fetchNotes = async (token: string) => {
  const response = await fetch("/api/v1/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

export const recentNotes = async (token: string) => {
  const response = await fetch("/api/v1/notes/recent", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};
