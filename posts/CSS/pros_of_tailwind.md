---
title: "The Pros of Using Tailwind"
date: 2023-12-12
description: "Hated it at first sight. Loved it after using it. My thoughts on why TailwindCSS is awesome"
tags: ["Style", "CSS", "Tailwind"]
---

> Once I got familiar with Tailwind, I started to love Tailwind.
>
> This is a summary of all the reasons I want you to consider Tailwind for your next project

## 1. Tailwind CSS

I think of all the CSS frameworks out there, Tailwind is the most controversial. Meaning, regardless of which forum or blog post you read, you are going to find people that absolutely hate it on one side and those who completely love it on the other.

I used to be one of the `CSS fundamentalists` who really disliked Tailwind. I liked staying in my comfort zone of using CSS-in-JS libraries because they kept CSS as CSS instead of forcing me to learn a bunch of new class names to style an element. Plus, JSX components with long class names were just horrendous to read `which honestly, I still think is true`. Every tech is going to come with its tradeoffs, but seeing all the cons of Tailwind, it was difficult for me at first to understand why so many people favored Tailwind.

I finally gave Tailwind a try for the first time making this blog with Next.js. To my surprise, after the initial `"My HTML looks disgusting"` phase, I started to really liking it and became a huge fan towards the end of the project.

## 2. Pros of Tailwind

These are some of the reasons why I personally adore Tailwind. They may not be a fair representation of your own personal experiences, but are good to consider if you are debating on whether or not to use Tailwind in your next project.

### 2-1. No More Naming

How many times have you promised yourself before a project that you will name everything perfectly this time, only to end up with a bunch of nasty names that aren't understandable just a month later?

At least for me, this was very common. Coming up with class names when using plain CSS or element names when using CSS-in-JS libraries was always painful. Near the end of my project, I would always end up with obnoxious names with a bunch of suffix/prefixes (e.g., _Wrapper_, _Container_, _Box_, _Main_ and so on).

```js
// Example of names I end up using when using CSS-in-JS libraries
const MainContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
```

Using Tailwind, you can keep most of your CSS inline, and therefore there is no need to struggle coming up with abstract names for every element in your codebase. I think you will appreciate this much more when you start using Tailwind yourself and realize you no longer have to waste time naming simple divs that are essentially just wrappers of other more significant elements. `Just style it and move on!`

```javascript
export default function ExampleComponent() {
  // ... (code)

  return (
    // ↓ No need to come up with names. Just style it and move
    <div className="flex flex-col gap-5">
      <p>This is an example element</p>
    </div>
  );
}
```

### 2-2. Not Having to Jump Around Your IDE

Using plain CSS means you are going to have to move back and forth from your `.css` files to wherever your HTML codes are to either add or udpate how components are styled. Using CSS-in-JS libraries is a bit better, but once the component gets large enough, you are going to have to scroll up and down to check which CSS properties are being applied to certain elements.

Another benefit to keeping your styles inline with Tailwind means that you don't have to jump around files or scroll up and down to understand how certain elements are styled anymore. Of course, at first, it feels almost illegal having to go against the SoC `Separation of Concern` approach and bombarding your HTML tags with CSS properties. On top of that, your HTML codes are likely going to look terrifying once you starting adding a lot of classes.

```javascript
// I'm not going to lie, HTML can get pretty terrifying

export default function CompponentWithDirtyHTML() {
  // ... (code)

  return (
    <div className="flex h-full w-full flex-col content-center items-center gap-2 p-3 sm:p-10 lg:w-[60%]">
      <p className="w-full text-center italic text-blue-300">
        This is an example element
      </p>
    </div>
  );
}
```

But once I got more familiar with Tailwind classes and started feeling less intimidated by the abnormally long HTML codes, I saw a rise in my productivity. Esepcially when it came to change how certain things were styled later down the road. And as developer who loves working on small personal projects and strives for productivity over anything, I personally think being able to save time much outweighs my need to follow the SoC approach.

### 2-3. Flexible, but Consistent

Tailwind makes it easier to keep your designs consistent while not being overly strict. If using other CSS frameworks is like ordering at Subway where you essentially have to pick everything to tailor to your needs, using Tailwind felt more like ordering a combo meal at McDoanld's. Customization is definitely possible, but the bundled combination is already pretty satisfactory.

A lot of the essential properties are kept numbered, and therefore almost as easy as changing a text's font-weight. For example, I used three different variations of gray to make this blog.

```css
.subtle-blog-text {
  @apply text-gray-500;
}

.regular-blog-text {
  @apply text-gray-300;
}

.title-blog-text {
  @apply text-gray-200;
}
```

I think it's easy to find reliable colors to use just by playing around with the variations Tailwind gives you by default; especially so if you are working on small personal projects.

Other essential CSS properties related to spacing, border width, and so on are also kept numbered and easily accessible.

```javascript
export default function PredefinedCSSValues() {
  return (
    // my-5 = { margin-top: 1rem; margin-bottom: 1rem }
    // p-1 = { padding: 0.25rem }
    // border-2 = { border-width: 2px }
    <div className="my-5 p-1">
      <p className="border-2"></p>
    </div>
  );
}
```

Of course, you don't have to use the predefined numbers to define styling values. You can simple put whatever you want inside `[]` customize how your elements look.

```javascript
export default function NonPredefinedCSSValues() {
  return (
    <div className="my-[10px] p-[5px]">
      <p className="border-[5px]"></p>
    </div>
  );
}
```

Furthermore, you can fix your `tailwind.config.ts` file to override what Tailwind gives you by default.In the example below, becuase `blue-300` is now defined as "black", elements using the `blue-300` color will now appear black.

```javascript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // ↓ blue-300 will not be black
        "blue-300": "black",
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2-4. Making a Global Theme is Easier

As hinted in the previous example, predefining global theme values and using them consistently throughout your project is much easier. There is no need to create another file. You can simply keep everything defined within your `tailwind.config.ts` file and start using them.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    screens: {
      sm: "500px",
      md: "800px",
      lg: "1200px",
      xl: "1400px",
    },
    extend: {
      colors: {
        primary: "rgb(35, 47, 62)",
        secondary: "rgb(45, 55, 67)",
      },
      spacing: {
        "96": "24rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

> 💡
>
> Notice that 'screens' object is defined outside 'extend' object.
>
> This means properties inside the 'colors' and 'spacing' object will be added to what Tailwind already gives you by default but properties in 'spacing' will override default Tailwind values.

After you have configured your `tailwind.config.ts` file as you the example above, you can simply use theme values anywhere throughout your project.

```javascript
export default function ExampleComponent() {
  return (
    <div className="border border-primary">
      <p className="text-secondary"></p>
    </div>
  );
}
```

### 2-5. Variants

Every frontend developer knows the overwhelming pain of having to change a component's styles when conditions (screen size, color theme, and so on) change. Fortunately, Tailwind makes this process a bit easier by providing short, straightforward variants.

```javascript
export default function ResponsiveComponent() {
  return (
    <div class="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
      Responsive Text
    </div>
  );
}
```

Variants like `sm`, `md`, `lg` represent screen sizes. In the example above, the size of the text is going to start at `10px` when the screen size is below what is defined as an `sm` screen size. From there on, as the screen size grows, so will the size of the text.

> Check out all variants available in Tailwind [here](https://v2.tailwindcss.com/docs/configuring-variants)

## Conclusion

As with any tech, there are definitely downsides to Tailwind as well; for example `as I continuously mention`, it's highly likely that you will end up with intimidating HTML codes.

However, keep in mind there are solutions around this. For example, you can use Tailwind's `@apply` functionality to bundle repeatedly used classes together. As in my case with this blog, I bundled many repeating utility classes together to keep my HTML shorter and less intimidating.

```css
/* utility classes used to give an item a hover effect */
.i-hover-up {
  @apply transform cursor-pointer transition hover:-translate-y-1;
}

/* utilty classes repeatedly used to make skeletons for components  */
.skeleton {
  @apply animate-pulse rounded-sm bg-gray-500 text-gray-500;
}
```

I also perceived code maintainability to be low initially. That's because I didn't keep my classes sorted at first. For example, if I habitually put the class `flex` first, I am instinctively more likely to look for each element's display value near the beginning of its class name (_only to realize I put it in the middle of the component later on_). Using Tailwind, I felt having your classes sorted automatically to some sort of recommended order is highly important to keeping your codes maintainable. Luckily, there are ways to do that with [_Prettier._](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

After overcoming some of its cons, I definitely saw a rise in my productivity when working with Tailwind. For small personal projects, I think Tailwind will be my go-to CSS framwork for awhile. I would definitely recommend you try it, especially if you are one of the CSS fundamentalists `like I was` who hate on Tailwind witout giving it a proper try!
