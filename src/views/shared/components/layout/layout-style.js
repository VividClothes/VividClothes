const layoutStyle = /* html */ `
  <style>
    #layout {
      width: 70%;
      margin: 30px 0;
      margin-left: 30px;
      padding: 30px 30px 30px 30px;
    }
    
    @media (max-width: 768px) {
      #layout {
        width: 90%;
        margin: 20px auto;
      }
    }
    
    @media (min-width: 768px) and (max-width: 1024px) {
      #layout {
        width: 80%;
        margin: 20px auto;
      }
    }
  </style>
`;

export default layoutStyle;
