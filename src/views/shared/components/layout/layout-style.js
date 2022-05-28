const layoutStyle = /* html */ `
  <style>
    #layout {
      width: 70%;
      margin: 80px auto;
      padding: 35px;
    }
    
    @media (max-width: 768px) {
      #layout {
        width: 90%;
        margin: 80px auto;
      }
    }
    
    @media (min-width: 768px) and (max-width: 1024px) {
      #layout {
        width: 80%;
        margin: 80px auto;
      }
    }
  </style>
`;

export default layoutStyle;
