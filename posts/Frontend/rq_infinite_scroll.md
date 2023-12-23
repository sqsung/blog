---
title: "Infinite Scroll with React Query"
date: 2023-07-08
description: "How to create inifinite scroll with React Query"
tags: ["React Query", "Infinite Scroll"]
isPublished: false
---

## 1. Intro: Infinite Scroll

If someone asked me for a summary of what frontend devs do, I would explain that they are responsible for rendering components based on dataset fetched from the application's server. The problem is that dataset can get pretty large for a commercial application. So, simply deciding to fetch all the data you need at once would slow down your application and negatively affect user experience. Consequently, a good frontend developer should be able to strategically handle large dataset and come up with ways to render pages effectively.

![MyChelin Guide Infinite Scroll Main Page](https://user-images.githubusercontent.com/112310899/236769855-db9ba5f3-1440-42de-9210-46362a1c5a37.gif)

I ran into the same problem when working on the main page of a project called `MyChelin Guide`, a service where users could vote their favorite restaurants per food category. As demonstrated in the gif file above, the main page of the project was basically a ranking page of restaurants of all registered restaurants sorted in order of popularity. As expected, the dataset was pretty large and fetching it all at once slowed down our application, harming user experience.

> Check out MyChelin Guide's repository [here](https://github.com/Team-Hoisting/mychelin-guide-typescript?tab=readme-ov-file)

A good solution to situations like this is using rendering your data in an infinite scroll approach. By implementing infinite scroll, you are empowered to show your users just a slice of your dataset before seaminglessly fetching before the user can notice.

## 2. React Query and its useInfiniteQuery Hook

React Query is a library that simplifies state management for remote data fetching, caching, and updating in React applications. I would advise that you give their [well-written docs](https://tanstack.com/query/v3/docs/react/overview) a try if you aren't familiar with React Query.

React Query simplifies inifinite scroll implementations with their hook called `useInfiniteQuery`. The params passed to `useInfiniteQuery` hook is identical to React Query's basic `useQuery` hook, but with three extra ones.

#### 1. queryFn:

- 'queryFn' is the API function that fetches a page of data for a given page index

#### 2. getNextPageParam:

- When new data is received for this query, this function receives both the first page of the infinite list of data and the full array of all pages.
- It should return a single variable that will be passed as the last optional parameter to your query function.
- Return undefined to indicate there is no previous page available.

#### 3. getPreviousPageParam:

- When new data is received for this query, this function receives both the first page of the infinite list of data and the full array of all pages
- It should return a single variable that will be passed as the last optional parameter to your query function
- Return undefined to indicate there is no previous page available

According to React Query docs, `useInfiniteQuery` hook returns the following values.

```js
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
  ...options,
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
});
```

Which return values and options to use most likely varies by projects. For my project, I used the following.

```js
const useFetchStores = () => {
  const category = useRecoilValue(categoryState);
  const keyword = useRecoilValue(searchInputState);

  const getStores = async (pageParams: number) => {
    const url = `/api/stores?keyword=${keyword}&categoryCode=${
      category === 'AL00' ? '' : category
    }&page=${pageParams}&page_size=${STORES_FETCH_SIZE}`;

    const stores = await fetchStores(url);

    return stores;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: [...storesQueryKey, category, keyword],
    queryFn: ({ pageParam = 1 }) => getStores(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === STORES_FETCH_SIZE ? allPages.length + 1 : undefined
  });

  return { data, isLoading, fetchNextPage, hasNextPage };
};

export default useFetchStores;
```

Every time `pageParam` increases (_an indication that there are more pages to fetch_), the `getStores` function is invoked. Consequently, the `getStores` function uses the current `keyword` (_user's search keyword_), `category` (_the food category user is viewing_), `pageSize` (_number of stores per page = 15_), and the new `pageParam` to create a new url, which is subsequently passed as a param to the `api/fetchSotres` function below.

```js
const fetchStores = async (url: string): Promise<StoresDataType> => {
  const response = await axios.get(url);
  return response.data;
};
```

The return values from the `useInfiniteQuery` hook mean the following.

- **_data_** : Data fetched by the query (In this case, paginated restaurant information)
- **_isLoading_** : A boolean value representing whether data is currently being fetched or not
- **_fetchNextPage_** : Function used to fetch more data
- **_hasNextPage_** : A boolean value representing whether there are any more pages to fetch

Using these four return values, all I had to do was decide when the next set of data should be fetched.

## 3. So... When Do I Fetch More?

In my case, I fetched 15 stores at once and let's assume you fetched about the same size of data. Logically, to have your users perceive a seamless infinite scroll, you are going to have to fetch more data once the user gets near the bottom of your data. There are two major ways to go about this. First is
