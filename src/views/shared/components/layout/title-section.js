import titleSectionStyle from '/layout/title-section-style.js';

const titleSection = (props) => {
  const { title, subTitle } = props;
  const { extraContent } = props || null;

  return /* html */ `
  ${titleSectionStyle}
  <div class="title-section-container">
    <h2 class="title-section-title is-2">
      ${title} / <span class="is-italic is-capitalized is-size-4">${subTitle}</span>
    </h2>
    <div class="title-section-left-side">
      ${extraContent ? extraContent() : ''}
    </div>
  </div>
  <hr>
  `;
};

export default titleSection;
