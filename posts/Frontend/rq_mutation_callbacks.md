---
title: "Why Your useMutation Callbacks May Not Be Working"
date: 2024-02-12
description: "Passing callbacks to React Query useMutation hook helps developers to more efficiently manage data mutation lifecycles. However, when it fails to work as anticipated, it can be frustrating. Here's why it might not work as intended."
tags: ["React", "React Query", "useMutation"]
isPublished: false
---

## Introduction

React Query's `useMutation` hook is an absolutely amazing solution for devs looking for ways to more efficiently manage data mutation lifecycles in their applications. By just passing callbacks like `onMutate`, `onSuccess`, `onSettled` and `onError`, developers can identify the logic for everything from optimistic updates to rollbacks on errors in a very straightforward and maintainable way.

However, things can get extremely frustrating when the callbacks you've passed don't work as anticipated. I encountered a similar challenge in a recent project of mine where all my callbacks (_except `onMutate`_) neither were being triggered nor threw errors. Here's how I approached the problem and what was causing my `useMutation` hook to fail without errors.

> If you are unfamiliar with React Query and its useMutation hook, I advise checking out their [official docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) first

## My Code

First and foremost, this is the version of React Query I used.

```
"@tanstack/react-query": "^5.18.1",
```

This might be a personal preference, but usually with useMutations, I like to create separate custom hooks as they tend come with a lot of code. Here is the code for my `useProfileMutation` custom hook, which I used when users updated their usernames.

```js
// @hooks/useProfileMutation.ts

export const useProfileMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (params: ProfileMutationParams) => {
      await updateProfile(params)
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["profile", variables.id] });

      const previous = queryClient.getQueryData(["profile", variables.id]);

      const updatedProfileData = {
        ...previous,
        username: variables.newValue
      }

      await queryClient.setQueryData(
      ["profile", variables.id],
        updatedProfileData,
      );

      return { previous };
    },

    onError: (error, variables, context) => {
      console.error(error);
      queryClient.setQueryData(["profile", variables.id], context?.previous);
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["profile", variables.id],
      });
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
};
```

Then in the component where users can change their username, I use the `useProfileMutation` hook like this.

```js
// profile/_components/EditProfileModal.hook.ts

const { mutate, isPending, isError } = useProfileMutation();

const onSubmit = () => {
  // ...other onSubmit logic
  mutate(
    {
      id,
      infoType,
      userType,
      newValue,
    },
    {
      onSettled: () => {
        onClose();
      },
    },
  );
};
```

In total, I am passing four callbacks to the useMutation hook. `onSuccess`, `onError`, `onMutate` inside my custom hook, and `onSettled` when I am using the mutate function returned from the useMutation hook. To briefly overview what each callback function is doing:

![Mutation Lifecycle Image](/mutation_lifecycle.png)

- **`onMutate`**: Optimistically updates the UI to reflect the updated value
- **`onError`**: If the username update fails internally (e.g., due to server errors), rollbacks the UI to the previous state
- **`onSuccess`**: If the username update succeeds, invalidates queries using the `['profile', id]` query key
- **`onSettled`**: Closes the modal in which the user changed his or her username

Initially, I thought my setup was complete as I was seeing my mutation work without a problem.
