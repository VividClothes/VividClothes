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
</style>

`;

export default headerStyle;
