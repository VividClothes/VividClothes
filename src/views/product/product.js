import { addCommas, convertToNumber, maskingFunc } from '/useful-functions.js';
import * as Api from '/api.js';
import { header, addHeaderEventListener } from '/header/header.js';
import { createCategory, addCategoryListener} from '/category/category.js';


/***************************헤더*************************************/
const nav = document.getElementById('header');
const navCategory = document.getElementById('category');
(async() => {
  nav.insertAdjacentElement('afterbegin', header);
  const categories = await Api.get('/category/list');
  navCategory.insertAdjacentHTML('afterbegin', await createCategory({ categories }));
  addHeaderEventListener();
  addCategoryListener(navCategory);
})();
/*******************************************************************/



/****************************요소 모음**********************************/
const imageContainer = document.querySelector('.image-container');
const mainImage = document.querySelector('.main-image');
const productName = document.querySelector('.product-name');
const productInfo = document.querySelector('.product-info');
const priceText = document.querySelector('.price-text');

const sizeSelectBox = document.querySelector('.size-select');
const colorSelectBox = document.querySelector('.color-select');
const totalPriceSum = document.querySelector('.total-price-text');

const selectedContainer = document.querySelector('.product-selected-container');

const buyButton = document.querySelector('.buy-container');
const cartButton = document.querySelector('.cart-container');

const prevBox = document.querySelector('.prev-box');
const nextBox = document.querySelector('.next-box');

const reviewContainerTitle = document.querySelector('.review-container-title');
const reviewBody = document.querySelector('.review-container-helper');
/*********************************************************************/


const selectedSizeColor = { size: '', color: '' };
let optionKeys = [];


/****************************렌더링**********************************/
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('id');
    let results = await Api.get(`/product/id/${productID}`);
    const result = results.product;
    console.log(result);

    mainImage.src = `${result.imagePath[0]}`;
    productName.textContent = result.productName;
    productInfo.textContent = result.info;
    priceText.textContent = addCommas(result.price);
    totalPriceSum.textContent = 0;

    let currentImageIndex = 0;
    const imagePaths = result.imagePath;



    /********************사이즈 박스 선택 이벤트*********************/
    sizeSelectBox.addEventListener('change', (e) => {
        
        selectedSizeColor.size = e.target.value; // 값 변경
        const size = selectedSizeColor.size;
        const color = selectedSizeColor.color;

        // 둘 다 선택되면 아이템 컴포넌트 추가
        const isAllChecked = size && color;
        if (isAllChecked) {
            const optionKey = `${size}${color}`;

            // 같은 옵션을 이미 선택했는지 검사
            const isAlreadyChecked = optionKeys.some(elem => elem === optionKey);
            
            // 이미 선택한 경우는 pass
            if (isAlreadyChecked) {
                alert('이미 선택한 옵션입니다.');
                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            } 
            
            // 선택하지 않은 옵션인 경우 컴포넌트 추가
            else {
                optionKeys.push(`${size}${color}`); // 사이즈+색 문자열 저장
                selectedContainer.insertAdjacentHTML('beforeend', 
                    makeItemContainerHTML(size, color, result.price));

                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
                setTotalPriceSum();
                checkSize();
                const newElement = selectedContainer.lastElementChild;
                const upButton = newElement.querySelector('.up-button');
                const downButton = newElement.querySelector('.down-button');
                const quantityInput = newElement.querySelector('.quantity');
                const cancelButton = newElement.querySelector('.cancel');
                
                // 수량 증가 버튼
                upButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const totalPriceText = e.target.parentNode.nextElementSibling;
                    const quantity = e.target.previousElementSibling;
                    let quantityNum = parseInt(quantity.value);

                    if (quantityNum === 99) {
                        alert('1 이상 99 이하의 수량만 가능합니다.');
                    } else {
                        quantityNum++;
                        quantity.value = quantityNum;
                        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
                    }

                    if (!quantityNum) {
                        quantity.value = 1;
                        totalPriceText.textContent = `${addCommas(result.price)}원`;
                    }
                    setTotalPriceSum();
                })

                // 수량 감소 버튼
                downButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const totalPriceText = e.target.parentNode.nextElementSibling;
                    const quantity = e.target.nextElementSibling;
                    let quantityNum = parseInt(quantity.value);

                    if (quantityNum === 1) {
                        alert('1 이상 99 이하의 수량만 가능합니다.');
                    } else {
                        quantityNum--;
                        quantity.value = quantityNum;
                        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
                    }

                    if (!quantityNum) {
                        quantity.value = 1;
                        totalPriceText.textContent = `${addCommas(result.price)}원`;
                    }
                    setTotalPriceSum();
                })
                

                // 수량 직접 입력
                quantityInput.addEventListener('change', (e) => {
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
                })


                // 취소 버튼
                cancelButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const option = e.target.parentNode.firstElementChild.textContent;
                    const [ size, color ] = option.split(' / ');
                    const optionKey = `${size}${color}`;
                    optionKeys = optionKeys.filter(elem => elem !== optionKey);

                    e.target.parentNode.remove();
                })
            }
        }
    })
    /*************************************************************/



    /********************색상 박스 선택 이벤트*********************/
    colorSelectBox.addEventListener('change', (e) => {
        selectedSizeColor.color = e.target.value; // 값 변경
        const size = selectedSizeColor.size;
        const color = selectedSizeColor.color;


        // 둘 다 선택되면 아이템 컴포넌트 추가
        const isAllChecked = size && color;
        if (isAllChecked) {
            const optionKey = `${size}${color}`;
            
            // 같은 옵션을 이미 선택했는지 검사
            const isAlreadyChecked = optionKeys.some(elem => elem === optionKey);
            
            // 이미 선택한 경우는 pass
            if (isAlreadyChecked) {
                alert('이미 선택한 옵션입니다.');
                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
            } 
            
            // 선택하지 않은 옵션인 경우 컴포넌트 추가
            else {
                optionKeys.push(`${size}${color}`); // 사이즈+색 문자열 저장
                selectedContainer.insertAdjacentHTML('beforeend', 
                    makeItemContainerHTML(size, color, result.price));

                resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor);
                setTotalPriceSum();
                checkSize();
                const newElement = selectedContainer.lastElementChild;
                const upButton = newElement.querySelector('.up-button');
                const downButton = newElement.querySelector('.down-button');
                const quantityInput = newElement.querySelector('.quantity');
                const cancelButton = newElement.querySelector('.cancel');
                
                // 수량 증가 버튼
                upButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const totalPriceText = e.target.parentNode.nextElementSibling;
                    const quantity = e.target.previousElementSibling;
                    let quantityNum = parseInt(quantity.value);

                    if (quantityNum === 99) {
                        alert('1 이상 99 이하의 수량만 가능합니다.');
                    } else {
                        quantityNum++;
                        quantity.value = quantityNum;
                        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
                    }

                    if (!quantityNum) {
                        quantity.value = 1;
                        totalPriceText.textContent = `${addCommas(result.price)}원`;
                    }
                    setTotalPriceSum();
                })

                // 수량 감소 버튼
                downButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const totalPriceText = e.target.parentNode.nextElementSibling;
                    const quantity = e.target.nextElementSibling;
                    let quantityNum = parseInt(quantity.value);

                    if (quantityNum === 1) {
                        alert('1 이상 99 이하의 수량만 가능합니다.');
                    } else {
                        quantityNum--;
                        quantity.value = quantityNum;
                        totalPriceText.textContent = `${addCommas(quantityNum * result.price)}원`;
                    }

                    if (!quantityNum) {
                        quantity.value = 1;
                        totalPriceText.textContent = `${addCommas(result.price)}원`;
                    }
                    setTotalPriceSum();
                })
                

                // 수량 직접 입력
                quantityInput.addEventListener('change', (e) => {
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
                })


                // 취소 버튼
                cancelButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const option = e.target.parentNode.firstElementChild.textContent;
                    const [ size, color ] = option.split(' / ');
                    const optionKey = `${size}${color}`;
                    optionKeys = optionKeys.filter(elem => elem !== optionKey);

                    e.target.parentNode.remove();
                })
            }
        }
    })
    /*************************************************************/



    /********************이미지 슬라이드 이벤트*********************/
    prevBox.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentImageIndex === 0) {
            currentImageIndex = imagePaths.length - 1;
        } else {
            currentImageIndex--;
        }

        mainImage.src = `${imagePaths[currentImageIndex]}`;
    })

    nextBox.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentImageIndex === imagePaths.length - 1) {
            currentImageIndex = 0;
        } else {
            currentImageIndex++;
        }

        mainImage.src = `${imagePaths[currentImageIndex]}`;
    })
    /*************************************************************/



    /********************슬라이더 화살표 표시***********************/
    if (imagePaths.length > 1) {
        imageContainer.addEventListener('mouseover', (e) => {
            prevBox.style.visibility = 'visible';
            nextBox.style.visibility = 'visible';
        })

        imageContainer.addEventListener('mouseout', (e) => {
            prevBox.style.visibility = 'hidden';
            nextBox.style.visibility = 'hidden';
        })
    }
    /*************************************************************/


    
    /********************BUY IT NOW 클릭 이벤트********************/
    buyButton.addEventListener('click', (e) => {
        e.preventDefault();

        const hashedEmail = localStorage.getItem('hashedEmail');
        
        // 로그인 안했으면 로그인으로 이동
        if (!hashedEmail) {
            window.location.href = '/login';
        }

        if (optionKeys.length === 0) {
            alert('옵션을 선택해주세요.');
        }

        else {
            // indexedDB에 삽입할 요소
            
            const datas = getDataObject(result);

            //indexedDB order 요소 삭제 후 저장
            const onRequest = indexedDB.open(hashedEmail, 1);
            onRequest.onsuccess = async () => {
                const db = onRequest.result;
                const transaction = db.transaction('order', 'readwrite');
                transaction.objectStore('order').clear();
                datas.forEach(data => {
                    transaction.objectStore('order').add(data);
                })
                window.location.href = '/order?storeName=order';  
            }
        }
    })
    /*************************************************************/



    /*******************ADD TO CART 클릭 이벤트********************/
    cartButton.addEventListener('click', (e) => {
        e.preventDefault();

        const hashedEmail = localStorage.getItem('hashedEmail');
        
        // 로그인 안했으면 로그인으로 이동
        if (!hashedEmail) {
            window.location.href = '/login';
        }
        
        if(optionKeys.length === 0) {
            alert('옵션을 선택해주세요.');
        }

        else {
            // indexedDB에 삽입할 요소
            const datas = getDataObject(result);

            //indexedDB order 요소 추가 저장
            const onRequest = indexedDB.open(hashedEmail, 1);
            
            onRequest.onsuccess = async () => {
                const db = onRequest.result;
                const transaction = db.transaction('cart', 'readwrite');
                datas.forEach(data => {
                    transaction.objectStore('cart').add(data);
                })
                alert('장바구니에 추가 되었습니다.')
            }
        }
    })
    /*************************************************************/


    /************************리뷰 렌더링**************************/
    const reviews = results.reviews.datas;
    console.log(reviews);

    reviewContainerTitle.textContent = `구매후기(${reviews.length})`;

    reviews.forEach((review) => {
        reviewBody.insertAdjacentHTML('beforeend', makeReviewContainerHTML(review));
    })
    
})();

function makeReviewContainerHTML(review) {
    return `
    <div class="review-container">
        <div class="review-head">
            <div class="writer">${maskingFunc.email(review.writer.email)}</div>
            <div class="review-date">${getDate(review.createdAt)}</div>
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
    `
}


function imageComponent(imagePaths) {
    return imagePaths.reduce((acc, path) => {
        return acc + `<img src="${path}" alt="review image" class="review-image-unit"></img>`
    },'')
}



function makeItemContainerHTML(size, color, price) {
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
    `
}


function resetOptionBoxes(sizeSelectBox, colorSelectBox, selectedSizeColor) {
    sizeSelectBox.value = sizeSelectBox[0].value;
    colorSelectBox.value = colorSelectBox[0].value;
    selectedSizeColor.size = '';
    selectedSizeColor.color = '';
}


function setTotalPriceSum() {
    const totalPrices = document.getElementsByClassName('price-sum');
    const sum = Array.from(totalPrices).reduce((sum, elem) => {
        return sum + convertToNumber(elem.textContent);
    }, 0)
    totalPriceSum.textContent = addCommas(sum);
}


function checkSize() {
    const selectedContainer = document.querySelector('.product-selected-container');
    const selectedOption = document.querySelector('.selected-option');
     
    const height = selectedContainer.offsetHeight;
    const unitHeight = selectedOption.offsetHeight;
    
    if(height > 250) {
        selectedContainer.style.height = `${unitHeight * 5}px`;
        selectedContainer.style.overflowY = 'scroll';
    }
}


function getDataObject(result) {
    const options = document.getElementsByClassName('option-text');
    const quantities = document.getElementsByClassName('quantity');
    
    const datas = [];
    Array.from(options)
         .forEach((elem, index) => {
            const quantity = Number(quantities[index].value); 
            const [ size, color ] = (options[index].textContent).split(' / ');
            const shortId = result._id + size + color;

            datas.push({
                productId: result._id,
                imagePath: result.imagePath[0],
                productName: result.productName,
                color,
                size, 
                quantity,
                price: result.price,
                shortId
            })
         })
    
    return datas;
}


// 날짜 전처리
function getDate(orderDate) {
    let [ date, time ] = orderDate.split('T');
    date = date.replaceAll('-', '.');
    time = time.split('.')[0]
    return `${date} ${time}`;
}