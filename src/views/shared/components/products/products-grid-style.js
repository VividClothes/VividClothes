const productGridStyle = /* html */ `
  <style>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 35px;
  column-gap: 35px;
}

.grid-contents {
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 45px;
}

@media (max-width: 550px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 550px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 960px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) and (max-width: 1320px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

.col {
  margin-bottom: 16px;
}

.card {
  position: relative;
  height: 100%;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}

.a-link {
  color: rgb(40, 40, 40);
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}

.font-16 {
  font-size: 16px;
}

.font-15 {
  font-size: 15px;
}

.subtitle {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 14px;
  text-align: end;
}

.grid-media {
  padding-top: 15px;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 12px;
}

.img-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.buynow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 700;
  color: whitesmoke;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.img-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.buynow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 700;
  color: whitesmoke;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.grid-img {
  display: block;
  background-color: transparent;
  width: 100%;
  height: 200px;
  object-fit: cover;
  transform-origin: center center;
  transition: transform 0.3s, filter 0.5s ease-in-out;
  filter: brightness(100%);
  z-index: 99;
}

.grid-img:hover {
  filter: brightness(70%);
  transform: scale(1.1);
}

.grid-img:hover ~ .buynow {
  visibility: visible;
  opacity: 1;
  transform: scale(1.2);
}

.button-container {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  font-size: 14px;
}

.buttonss {
  color: whitesmoke;
  padding: 5px 7.5px;
  border: 0;
  margin-left: 3px;
  cursor: pointer;
}

.button-add {
  font-size: 18px;
  font-weight: bold;
  padding: 6.5px 10px;
  border: 1px solid #ccc;
  margin-left: 15px;
  cursor: pointer;
}
  </style>
`;
export default productGridStyle;
