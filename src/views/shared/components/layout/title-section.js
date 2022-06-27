import titleSectionStyle from '/layout/title-section-style.js';

const titleSection = (props) => {
  const { title, subTitle } = props;
  const { extraContent } = props || null;

  return /* html */ `
  ${titleSectionStyle(title)}
  <div class="title-section-container">
    <h2 class="title-section-title">
      ${title} / <span class="title-section-subtitle">${subTitle}</span>
    </h2>
    <div class="title-section-left-side">
      ${extraContent ? extraContent() : ''}
    </div>
  </div>
  <hr class="title-section-hr">
  `;
};

export default titleSection;
