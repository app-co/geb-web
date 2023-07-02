import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    * {

        margin: 0;

        padding: 0;

        box-sizing: border-box;

    }



    :focus {

        outline: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {

        color: #11133b;

        background-color: #e7e7e7;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }

    h1 {
      font-size: calc(1rem + 2.5vw);
      font-weight: 900;
    }

    h2 {
      font-size: calc(12px + 2vw);
      font-weight: 800;
    }

    h3 {
      font-size: calc(16px + .7vw);
      font-weight: 600;
    }

    h4 {
      font-size: calc(10px + .7vw);
      font-weight: 600;
    }

    p {
      font-size: calc(8px + .5vw);
      font-weight: 300;
    }



    body, input, textarea, button {

        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 400;
        border: none;


    }

    button {
      cursor: pointer;
      border-radius: 5px;
      
      &:hover {
        opacity: 0.9;
      }
    }

`
