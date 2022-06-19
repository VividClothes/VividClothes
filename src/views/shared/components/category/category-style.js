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
  padding: 0 6px;
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
  font-size: 17px;
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
}

.open {
  visibility: visible;
  transform: translateX(0);
}

.mobile-search {
  position: absolute;
  top: 12px;
  left: 15px;
}

.mobile-search .wrapper {
  width: 150px;
  display: inline-block;
}

.mobile-search .searchBar {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mobile-search .searchQueryInput {
  width: 100%;
  height: 2.8rem;
  background: #ebebeb;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  padding: 0 3.5rem 0 1.5rem;
  font-size: 1rem;
}

.mobile-search .searchQuerySubmit {
  width: 3.5rem;
  height: 2.8rem;
  margin-left: -3.5rem;
  background: none;
  border: none;
  outline: none;
}

.mobile-search .searchQuerySubmit:hover {
  cursor: pointer;
}

@media screen and (min-width: 768px) {

}

@media screen and (min-width: 1024px) {
  .mobile-search {
    display: none;
  }

  .mobile-search .sidebar-links li {
    margin-bottom: 10px;
    font-size: 20px;
  }  
}
</style>
`;

export default categoryStyle;
