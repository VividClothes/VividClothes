import { adminOrderTabData } from '/admin-tab/admin-tab-data.js';

const adminTabStyle = /* html */ `
  <style>
    .admin-tab-wrapper {
      position: fixed;
      top: 50%;
      right: 7.5vw;
      background: #fff;
      margin: 0 20px;
      transform: translateY(-50%);
      border-radius: 12px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      background-color: whitesmoke;
    }

    .admin-tab-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 17px;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
    }
    
    .admin-tap-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .admin-tap-content .tab-list{
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
    }

    .admin-tap-content .tab-list label{
      height: 60px;
      font-size: 16px;
      font-weight: 500;
      line-height: 60px;
      cursor: pointer;
      padding-left: 25px;
      padding-right: 25px;
      transition: all 0.5s ease;
      color: #333;
      z-index: 12;
    }

    ${adminOrderTabData
      .map((tab) => {
        return /* css */ `
        #${tab.id}:checked ~ .tab-list label.${tab.id} {
          color: #fff;
        }
      `;
      })
      .join('')}

      ${adminOrderTabData
        .map((tab, index) => {
          return /* css */ `
        #${tab.id}:checked ~ .tab-list .slider {
          top: ${index * 60}px;
        }
      `;
        })
        .join('')}   

    .admin-tap-content .tab-list label:hover{
      color: rgb(51, 78, 97);
    }
    .admin-tap-content .slider{
      position: absolute;
      left: 0;
      top: 0;
      height: 60px;
      width: 100%;
      border-radius: 12px;
      background: #6d50e2;
      transition: all 0.4s ease;
    }

    .admin-tap-content input{
      display: none;
    }
  </style>
`;

export default adminTabStyle;
