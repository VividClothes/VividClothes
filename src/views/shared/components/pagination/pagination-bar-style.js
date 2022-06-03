const paginationStyle = /* html */ `
<style>
:root {
  --primary: #23adad;
  --greyLight: #23adade1;
  --greyLight-2: #cbe0dd;
  --greyDark: #2d4848;
}

.page {
  list-style-type: none;
}

.items-list {
  max-width: 90vw;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3rem;
  justify-content: center;
  align-content: center;
}

@media only screen and (max-width: 600px) {
  .items-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--greyDark);
  cursor: pointer;
}

  .pagi-icon {
    position: relative;
    z-index: 99;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(#5a6181, 0.05);
    border-radius: 6px;
    padding: 15px;
    font-size: 25px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

.pagi-icon:hover {
    transform: scale(1.2);
    color: var(--primary);
  }

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 3rem;
  border-radius: 0.6rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
}

  .page-numbers,
  .page__btn,
  .page__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .page__dots {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--greyLight);
    cursor: initial;
  }

  .page-numbers {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.4rem;
  }

  .page-numbers:hover {
    color: var(--primary);
  }

  .page-numbers.active {
    color: #ffffff;
    background: var(--primary);
    font-weight: 600;
    border: 1px solid var(--primary);
  }

  .page__btn {
    color: var(--greyLight);
  }

    .page__btn.active {
      color: var(--greyDark);
      pointer-events: initial;

    
    }
  .page__btn:hover {
        color: var(--primary);
      }
</style>
`;

export default paginationStyle;
