import { fetchArticles } from "./fetchArticles"; // Your async thunk file path
import { apiHeader, baseUrl } from "../../config/apiConfig"; // Assuming these are imported correctly
import { setArticles, setArticleType } from "../../redux/slices/articlesSlice";
import { vi, expect, test } from "vitest";

// Mock the `fetch` function globally
vi.stubGlobal("fetch", vi.fn());

// Mock Redux store state and dispatch
const mockDispatch = vi.fn();
const mockGetState = () => ({
  auth: { user: "user123" }, // Mocking userId as 'user123' for the test
});

// Test for successful fetching of articles
test("fetchArticles should fetch and dispatch data correctly", async () => {
  // Mock response for the API call
  const mockResponse = {
    articles: [
      { articleId: 1, title: "Article 1" },
      { articleId: 2, title: "Article 2" },
    ],
  };

  // Mock the fetch call to return the mockResponse
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const params = { endpoint: "articles", set: true, params: { page: 1 } };

  // Call the async fetchArticles thunk
  const result = await fetchArticles(params, {
    rejectWithValue: vi.fn(),
    dispatch: mockDispatch,
    getState: mockGetState,
  });

  // Assert that fetch was called with the correct URL, including userId
  expect(fetch).toHaveBeenCalledWith(
    `${baseUrl}/articles/articles?page=1&userId=user123`, // Assuming `userId` is passed in the query
    { headers: apiHeader }
  );

  // Assert that dispatch was called with the correct actions and payloads
  expect(mockDispatch).toHaveBeenCalledWith(setArticles(mockResponse.articles));
  expect(mockDispatch).toHaveBeenCalledWith(setArticleType("articles"));

  // Assert the result of the fetchArticles function matches the mock response
  expect(result).toEqual(mockResponse);
});

// Test for error handling (fetch error)
test("fetchArticles should handle fetch errors", async () => {
  // Mock fetch to simulate an error
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: false,
    status: 500,
  });

  const params = { endpoint: "articles", set: true, params: { page: 1 } };

  // Call the async fetchArticles thunk and check for error handling
  const result = await fetchArticles(params, {
    rejectWithValue: vi.fn(),
    dispatch: mockDispatch,
    getState: mockGetState,
  });

  // Assert that the error is correctly returned
  expect(result).toBe("HTTP error! status: 500");
});
