const titleSectionStyle = (title) => {
  return /* html */ `
<style>
  .title-section-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: ${title !== '회원 정보' ? 'center' : 'flex-end'};
  }
  
  .title-section-title {
    font-size: 2.5rem;
    font-weight: 600;
  }

  .title-section-left-side {
    display: flex;
    align-items: center;
  }
  
  hr {
    background-color: rgb(213, 213, 213);
  }

</style>
`;
};

export default titleSectionStyle;
