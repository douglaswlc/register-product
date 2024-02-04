async function fetchMockData() {
  const url = "https://65be4e05dcfcce42a6f234b7.mockapi.io/api/books/:book";
  const response = await fetch(url);
  const mockData = await response.json();
  return mockData;
}
