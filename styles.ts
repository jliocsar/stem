export const css = /*css*/ `
:root {
  --black: #000000;
  --red: #aa0000;
  --green: #00aa00;
  --yellow: #aa5500;
  --blue: #0000aa;
  --magenta: #aa00aa;
  --cyan: #00aaaa;
  --white: #aaaaaa;
  --bright-black: #555555;
  --bright-red: #ff5555;
  --bright-green: #55ff55;
  --bright-yellow: #ffff55;
  --bright-blue: #5555ff;
  --bright-magenta: #ff55ff;
  --bright-cyan: #55ffff;
}

html {
  font-family: VT323, monospace;
  font-size: 32px;
  color: var(--white);
}

html, h1, h2, b, strong {
  font-weight: 300;
}

header {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.logo-wrapper pre {
  color: var(--red);
  font-size: 0.8rem;
  font-family: VT323, monospace;
}

h1 {
  color: var(--red);
  margin-bottom: 0;
}

.subtitle {
  margin-bottom: 1rem;
}

h2 {
  color: var(--green);
}

h3 {
  color: var(--yellow);
}

li::marker {
  color: var(--red);
}

li > ul > li::marker {
  color: var(--bright-blue);
}

span {
  color: var(--cyan);
}

body {
  margin: 0;
  background: var(--black);
  padding: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.section-wrapper {
  border: 1px solid var(--bright-black);
  overflow: hidden;
  padding: 1rem;
}

main section {
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 0.5rem;
  width: 100%;
  height: 100%;
}

h2, p {
  margin: 0.2rem 0;
}

p {
  text-wrap: nowrap;
  display: inline-block;
  width: max-content;
}

body::-webkit-scrollbar {
  width: 0.25rem;
}

section::-webkit-scrollbar {
  height: 0.25rem;
  background: var(--bright-black);
}

body::-webkit-scrollbar-thumb,
section::-webkit-scrollbar-thumb {
  background-color: var(--white);
}

ul {
  margin: 0;
}

ul li {
  margin: 0.2rem 0 0.6rem 0;
}

@media (min-width: 960px) {
  main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
  }

  .section-wrapper:last-of-type {
    grid-column: span 2;
  }

  .disk-information ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  main {
    grid-template-columns: repeat(3, 1fr);
  }

  .disk-information ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
`
