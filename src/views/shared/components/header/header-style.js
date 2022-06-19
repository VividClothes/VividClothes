const headerStyle = /* html */ `
<style>
.header-component {
  background-color: #474747;
  color: whitesmoke;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 35%);
}

.header-left-container {
  display: none;
}

#header-nav-root {
  display: none;
}

.flex-style {
  background-color: #474747;
  color: whitesmoke;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}

.header-logo {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  font-size: 30px;
  font-family: 'Rancho', cursive;
}

.link {
  color: whitesmoke;
  transition: color 0.3s ease;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.link:hover {
  color: gold;
}

.show {
  display: block;
}

.clicked {
  color: gold;
}

.wrapper {
  width: 200px;
  display: none;
}

.searchBar {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#searchQueryInput {
  width: 100%;
  height: 2.8rem;
  background: #ebebeb;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  padding: 0 3.5rem 0 1.5rem;
  font-size: 1rem;
}

#searchQuerySubmit {
  width: 3.5rem;
  height: 2.8rem;
  margin-left: -3.5rem;
  background: none;
  border: none;
  outline: none;
}

#searchQuerySubmit:hover {
  cursor: pointer;
}

.mobile-hamburger-menu {
  display: inline-block;
  margin-left: 30px;
}

@media screen and (min-width: 768px) {
  .flex-style {
    flex-direction: row;
    height: 80px;
  }

  #header-nav-root {
    font-size: 15px;
    margin-right: 30px;
  }

  .wrapper {
    display: none;
  }

  .header-logo {
    font-size: 35px;
  }

  .header-left-container {
    display: block;
  }

  #header-nav-root {
    display: block;
  }

  .mobile-hamburger-menu {
    display: none;
  }

  .hamburger-menu {
    display: inline-block;
    margin-left: 35px;
  }

  .span-dash {
    margin: 0 7px;
  }
}

@media screen and (min-width: 1024px) {
  .flex-style {
    flex-direction: row;
    height: 90px;
  }

  .wrapper {
    width: 200px;
    display: inline-block;
    margin-left: 50px;
  }

  #header-nav-root {
    font-size: 16px;
    margin-right: 48px;
  }

  .header-logo {
    font-size: 40px;
  }

  .hamburger-menu {
    margin-left: 48px;
  }

  .span-dash {
    margin: 0 12px;
  }
}
</style>
`;

export default headerStyle;
