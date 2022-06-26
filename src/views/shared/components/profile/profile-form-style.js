const profileStyle = /* html */ `
<style>

.user-info-title {
  color: #f0a500;
  margin: 10px 0;
  font-size: 17.5px;
  font-weight: bold;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}

.user-info-title > span {
  color: #f0a500;
  font-size: 13px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 16px;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}

.post-number {
  width: 50%;
  margin-bottom: 10px;
}

.post-btn {
  padding: 16px;
  color: whitesmoke;
  cursor: pointer;
  margin-left: 25px;
  border: 0;
  background-color: #474747;
  display: inline-block;
  transition: all 0.3s ease;
}

.post-btn:hover {
  background-color: black;
}

.post-inputs {
  margin: 10px 0;
}

.tooltip-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  font-size: 13px;
  right: 0;
  top: 0px;
  padding: 4px 10px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  background-color: rgb(238, 238, 238);
  border-radius: 25px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tooltip-hover-effect {
  top: -70%;
  opacity: 1;
  pointer-events: auto;
}

.tooltip::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: rgb(238, 238, 238);
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.user-info-edit-btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: whitesmoke;
  background-color: #474747;
  padding: 15px 30px;
  font-size: 16.5px;
  border: 0;
  transition: background-color 0.3s;
}

.user-info-edit-btn:hover {
  background-color: black;
}

input:focus {
  outline: 0;
  border-color: #bd8200;
}
input:focus + .input-icon i {
  color: #f0a500;
}
input:focus + .input-icon:after {
  border-right-color: #f0a500;
}

.input-group {
  margin-bottom: 1em;
  zoom: 1;
}
.input-group:before,
.input-group:after {
  content: "";
  display: table;
}
.input-group:after {
  clear: both;
}
.input-group-icon {
  position: relative;
}
.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.user-info-container {
  max-width: 38em;
  padding: 10px 15px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.row {
  zoom: 1;
}
.row:before,
.row:after {
  content: "";
  display: table;
}
.row:after {
  clear: both;
}

.user-info-label {
  font-style: italic;
  font-size: 15px;
  margin-bottom: 8px;
}

@media screen and (min-width: 768px) {
  .user-info-container {
    padding: 16px 30px;
  }

  .user-info-title {
    font-size: 20.5px;
  }

  .user-info-title > span {
    font-size: 14px;
  }

  .user-info-label {
    font-size: 16px;
  }
}
</style>
`;

export default profileStyle;
