import { addCommas } from '/useful-functions.js';


// 수량 증가 및 감소 이벤트 핸들러
export const handleUpDownButton = (e, result, type, setTotalPriceSum) => {
    e.preventDefault();
    const totalPriceText = e.target.parentNode.nextElementSibling;
    const quantity = type === 'up' ?
        e.target.previousElementSibling :
        e.target.nextElementSibling;
    let quantityNum = parseInt(quantity.value);

    if ((quantityNum === 99 && type === 'up') || (quantityNum === 1 && type === 'down')) {
        alert('1 이상 99 이하의 수량만 가능합니다.');
    } else {
        type === 'up' ? quantityNum++ : quantityNum--;
        quantity.value = quantityNum;
        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
    }

    if (!quantityNum) {
        quantity.value = 1;
        totalPriceText.textContent = `${addCommas(result.price)}원`;
    }
    setTotalPriceSum();
}


// 수량 직접 입력 이벤트 핸들러
export const handleQuantityInput = (e, result, setTotalPriceSum) => {
    const totalPriceText = e.target.parentNode.nextElementSibling;
    const quantityNum = parseInt(e.target.value);
    if (quantityNum >= 1 && quantityNum <= 99) {
        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
    } else {
        alert('1 이상 99 이하의 수량만 가능합니다.');
        e.target.value = 1;
        totalPriceText.textContent = `${addCommas(result.price)}원`;
    }
    setTotalPriceSum();
}


// 취소 버튼 이벤트 핸들러
export const handleCancelButton = (e, optionKeys, setTotalPriceSum) => {
    e.preventDefault();
    const option = e.target.parentNode.firstElementChild.textContent;
    const [size, color] = option.split(' / ');
    const optionKey = `${size}${color}`;
    optionKeys = optionKeys.filter((elem) => elem !== optionKey);

    e.target.parentNode.remove();
    setTotalPriceSum();

    return optionKeys;
}
