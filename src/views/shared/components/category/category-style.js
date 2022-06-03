const categoryStyle = /* html */ `
<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  color: whitesmoke;
  background-color: #363636;
  z-index: 999;
  visibility: hidden;
  transition: all 0.8s ease;
  transform: translateX(-100%);
  box-shadow: -3px 0 4px rgba(0, 0, 0, 25%);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 15px;
  border: 0px;
  padding: 6px;
  font-size: 32px;
  color: whitesmoke;
  background: transparent;
  cursor: pointer;
}

.sidebar-links {
  position: relative;
  top: 70px;
  border-top: 1.5px solid rgba(0, 0, 0, 15%);
}

.sidebar-links ul {
  margin: 0px;
  padding-top: 13px;
  padding-left: 16px;
}

.sidebar-links li {
  margin-bottom: 10px;
  font-size: 24px;
}

.sidebar-links li a {
  display: inline-flex;
  align-items: center;
  padding: 5px;
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

.link-text {
  padding-left: 7.5px;
  font-size: 20px;
}

.open {
  visibility: visible;
  transform: translateX(0);
}
</style>
`;

export default categoryStyle;
