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

        color: '#232929';

        background-color: '#232020';

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }

    h1 {
      font-size: calc(1rem + 2.5vw);
      font-weight: 900;
    }

    h2 {
      @media (min-width: 350px) {
        font-size: calc(1.5rem + 2vw);
      }

      @media (min-width: 750px) {
        font-size: calc(1rem + 2.2vw);
      }

      @media (min-width: 1080px) {
        font-size: calc(1rem + 1.6vw);
      }

      @media (min-width: 1300px) {
        font-size: calc(1rem + 1.2vw);
      }
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
