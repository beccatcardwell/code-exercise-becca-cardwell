# Submission Notes

This submission is using Next.js, a React.js framework. It is taking advantage of Next.js's Image component, which allows you to set image optimization, lazy loading, and a placeholder blur image while loading functionality for performance and preventing layout shifts. Next.js doesn't auto-open up the window when running npm run start, so you will need to manually navigate to localhost.

I am using Fuse.js to handle fuzzy search.

I created keyboard functionality for the dropdown menus so that when the Escape key is hit, or onBlur() of the last dropdown input, it will close the menu and send focus back to it's controlling button.

My code editor has a prettier-standard code formatter to keep code well formatted, and the project has ESLint.

## Given more time, what would you have done differently?

More optimization and breaking up some of the code in pages/index.js into a container component to make the page a little cleaner

## How did you deviate from the directions, if at all, and why?

I made some a11y improvements:

1. The h2 elements had a very low contrast ratio of 2.98, which fails AA WCAG 2.1 levels. I changed the text color to black which brings the contrast up to 7.04, which passes AA and AAA for both normal and large text.
2. The headings levels skipped straight to h2. Skipping heading levels can cause confusion, especially for screen reader users that are navigating content by headings. I added an h1 before both h2 elements to pass.
3. The Exercise 1 anchor element also had a very low contrast, so I kept the text black instead of white.
4. The Exercise 2 dropdown menu design also had very low contrast, so I made the text color black
5. The movies/books radio buttons need a fieldset with a legend to be accessible, so I added those.
6. The clear filters button was styled as a link, but only links should be styled as links.
7. I added a scroll bar to the dropdown menu's for easier navigation.
8. I added a little more space between each media item, because I think it's a little bit easier to find/read title/year/genre info than when they are crowded together

## Is there anything else you'd like to let us know?

_your answer here_
