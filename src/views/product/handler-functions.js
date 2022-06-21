import { addCommas, convertToNumber, maskingFunc, getDate } from '/useful-functions.js';

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

export const handlePrevBox = (e, currentImageIndex, imagePaths, mainImage) => {
    e.preventDefault();

    if (currentImageIndex === 0) {
      currentImageIndex = imagePaths.length - 1;
    } else {
      currentImageIndex--;
    }

    mainImage.src = `${imagePaths[currentImageIndex]}`;

    return currentImageIndex;
}

export const handleNextBox = (e, currentImageIndex, imagePaths, mainImage) => {
    e.preventDefault();

    if (currentImageIndex === imagePaths.length - 1) {
      currentImageIndex = 0;
    } else {
      currentImageIndex++;
    }

    mainImage.src = `${imagePaths[currentImageIndex]}`;

    return currentImageIndex;
}

export const imageSlideArrow = (imagePaths, imageContainer, prevBox, nextBox) => {
    if (imagePaths.length > 1) {
        imageContainer.addEventListener('mouseover', (e) => {
          prevBox.style.visibility = 'visible';
          nextBox.style.visibility = 'visible';
        });
    
        imageContainer.addEventListener('mouseout', (e) => {
          prevBox.style.visibility = 'hidden';
          nextBox.style.visibility = 'hidden';
        });
      }
}

export const handleBuyButton = (e, optionKeys, result) => {
    e.preventDefault();

    const hashedEmail = localStorage.getItem('hashedEmail');

    // 로그인 안했으면 로그인으로 이동
    if (!hashedEmail) {
      window.location.href = '/login';
    }

    if (optionKeys.length === 0) {
      alert('옵션을 선택해주세요.');
    } else {
      // indexedDB에 삽입할 요소

      const datas = getDataObject(result);

      //indexedDB order 요소 삭제 후 저장
      const onRequest = indexedDB.open(hashedEmail, 1);
      onRequest.onsuccess = async () => {
        const db = onRequest.result;
        const transaction = db.transaction('order', 'readwrite');
        transaction.objectStore('order').clear();
        datas.forEach((data) => {
          transaction.objectStore('order').add(data);
        });
        window.location.href = '/order?storeName=order';
      };
    }
}

export const handleCartButton = (e, optionKeys, result) => {
    e.preventDefault();

    const hashedEmail = localStorage.getItem('hashedEmail');

    // 로그인 안했으면 로그인으로 이동
    if (!hashedEmail) {
      window.location.href = '/login';
    }

    if (optionKeys.length === 0) {
      alert('옵션을 선택해주세요.');
    } else {
      // indexedDB에 삽입할 요소
      const datas = getDataObject(result);

      //indexedDB order 요소 추가 저장
      const onRequest = indexedDB.open(hashedEmail, 1);

      onRequest.onsuccess = async () => {
        const db = onRequest.result;
        const transaction = db.transaction('cart', 'readwrite');
        datas.forEach((data) => {
          transaction.objectStore('cart').add(data);
        });
        alert('장바구니에 추가 되었습니다.');
      };
    }
}

export const makeReviewContainerHTML = (review) => {
    return `
    <div class="review-container">
        <div class="review-head">
            <div class="review-date">${getDate(review.createdAt)}</div>
            <div class="writer">${maskingFunc.email(review.writer.email)}</div>
        </div>
        <div class="product-name-options">
            <div class="image-box"
            style="background-image:url('${review.productId.imagePath[0]}')"
            onclick="
            window.location.href='/product?id=${review.productId._id}'
            "></div>
            <div class="options-box">
                <div class="product-name">${review.productId.productName}</div>
                <div class="options">${review.option.size} / ${review.option.color} 구매</div>
            </div>
        </div>
        <div class="review-rate">
            <span class="star"> 
                ★★★★★
                <span class="star-color" style="width:${10 * review.rate}%">★★★★★</span>
            </span>
        </div>
        <div class="review-content">${review.content}</div>
        <div class="review-image">
            ${imageComponent(review.imagePath)}
        </div>
    </div>
    `;
}

export const makeItemContainerHTML = (size, color, price) => {
    return `
    <div class="selected-option">
        <div class="option-text option-sort-helper">${size} / ${color}</div>
        <div class="quantity-container option-sort-helper">
            <span class="fa-solid fa-minus quantity-wrap down-button"></span>
            <input class="quantity" value="1" type="text">
            <span class="fa-solid fa-plus quantity-wrap up-button"></span>
        </div> 
        <div class="price-sum option-sort-helper">${addCommas(price)}원</div>   
        <div class="cancel option-sort-helper">x</div>
    </div>
    `;
}

const imageComponent = (imagePaths) => {
    return imagePaths.reduce((acc, path) => {
        return acc + `<img src="${path}" alt="review image" class="review-image-unit"></img>`;
    }, '');
}

const getDataObject = (result)  => {
    const options = document.getElementsByClassName('option-text');
    const quantities = document.getElementsByClassName('quantity');

    const datas = [];
    Array.from(options).forEach((elem, index) => {
        const quantity = Number(quantities[index].value);
        const [size, color] = options[index].textContent.split(' / ');
        const shortId = result._id + size + color;

        datas.push({
            productId: result._id,
            imagePath: result.imagePath[0],
            productName: result.productName,
            color,
            size,
            quantity,
            price: result.price,
            shortId,
        });
    });

    return datas;
}