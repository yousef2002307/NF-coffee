/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "./resources/css/**/*.css",
    "./node_modules/flowbite/**/*.js",  // if using Flowbite or similar
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

