const headerStyle = /* html */ `
<style>
.header-component {
  background-color: #474747;
  color: whitesmoke;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 35%);
}

.flex-style {
  background-color: #474747;
  color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 95px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}

.header-logo {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
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
  display: inline-block;
  margin-left: 150px;
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

.hamburger-menu {
  display: inline-block;
}
</style>

`;

export default headerStyle;
