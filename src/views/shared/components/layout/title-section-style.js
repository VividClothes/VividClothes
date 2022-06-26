const titleSectionStyle = (title) => {
  return /* html */ `
<style>
  .title-section-container {
    display: flex;
    flex-direction: ${title === '관리자 설정' ? 'column' : 'row'};
    width: 100%;
    justify-content: space-between;
    align-items: ${title === '회원 정보' ? 'flex-end' : 'center'};
  }
  
  .title-section-container > .title-section-title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: ${title === '관리자 설정' ? '7.5px' : '0'};
  }

  .title-section-title >.title-section-subtitle {
    font-size: 20px;
    font-style: italic;
  }

  .title-section-container > .title-section-left-side {
    display: flex;
    align-items: center;
  }
  
  .title-section-hr {
    background-color: rgb(213, 213, 213);
    margin: 15px 0;
  }

  @media screen and (min-width: 768px) {
    .title-section-container {
      flex-direction: row;
    }
    
    .title-section-container > .title-section-title {
      margin-bottom: 0;
    }
  }

</style>
`;
};

export default titleSectionStyle;
