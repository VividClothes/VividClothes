import { addCommas, convertToNumber } from '/useful-functions.js';
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



/***********************************주소 찾기******************************************/
const postCodeButton = document.querySelector('.postcodeButton');
postCodeButton.addEventListener('click', postCodeButtonCallBack);
/*************************************************************************************/



/****************************요소 모음**********************************/
const itemsBody = document.querySelector('.items-body');
const orderButton = document.querySelector('.order-button');
const recipient = document.querySelector('.recipient');
const phone = document.querySelector('.phone');
const postcode = document.querySelector('.postcode');
const address1 = document.querySelector('.address1');
const address2 = document.querySelector('.address2');
const recipientArray = [recipient, phone, postcode, address1, address2];
/*********************************************************************/



// 상품 아이디 배열 - 결제하기 클릭하면 indexedDB에서 지워야함
const productIdArray = [];



(async () => {
    
    /*****************************쿼리스트링 값 추출*************************/
    const urlParams = new URLSearchParams(window.location.search);
    const storeName = urlParams.get('storeName');
    /**********************************************************************/



    // indexedDB 접속
    const hashedEmail = localStorage.getItem('hashedEmail');
    const onRequest = indexedDB.open(hashedEmail, 1);
    onRequest.onsuccess = () => { 
        const db = onRequest.result;
        const transaction = db.transaction(storeName, 'readonly');
        const results = transaction.objectStore(storeName).getAll();
        
        // indexedDB에서 데이터 가져오기 성공
        results.onsuccess = () => {
            let buyProducts = results.result;

            if(storeName === 'cart') {
                // 장바구니에서 넘어온 경우 체크된 상품들만 필터링
                buyProducts = buyProducts.filter((product) => product.isChecked)
            }


            /*************************구매 상품 렌더링*****************************/ 
            buyProducts.forEach((product) => {
                itemsBody.insertAdjacentHTML('beforeend', makeItemHTML(product));
                productIdArray.push(product.productId);
            })
            /*********************************************************************/



            /*********************이미지 박스 이벤트 추가**************************/
            const imageBoxes = itemsBody.getElementsByClassName('image-box');
            Array.from(imageBoxes)
                .forEach((imgBox, index) => {
                    imgBox.style.backgroundImage = `url( "${buyProducts[index].imagePath}" )`;
                    imgBox.addEventListener('click', (e) => {
                        window.location.href = `/product/?id=${buyProducts[index].productId}`;
                    })
                });
            /*********************************************************************/


            
            /*****************************주문 버튼 관련******************************/
            orderButton.value = `${addCommas(getTotalPrice(buyProducts))}원 결제하기`;
            orderButton.addEventListener('click', async (e) => {
                e.preventDefault();
                
                // 주문 post 보낼때 상품 필드값
                const productsInfo = getProductsInfo(buyProducts);

                // 수령인 정보 객체로 가져오기. 빈칸 하나라도 존재하면 flase 반환.
                const recipientInfo = getRecipientInfo(...recipientArray);
                
                if (recipientInfo) {
                        
                    const postData = {
                        ...recipientInfo,
                        products: productsInfo
                    }
                    
                    // 서버에 주문 요청 
                    await Api.post('/order/register', postData);
                    
                    // 주문 완료한 상품 indexedDB에서 삭제
                    const transaction = db.transaction(storeName, 'readwrite');
                    productIdArray.forEach(item => {
                        transaction.objectStore(storeName).delete(item);
                    })


                    // 수정 필요
                    alert('주문이 접수되었습니다. 주문 조회 페이지로 이동합니다.');
                    window.location.href = '/user-order-list';
                }
            })
            /*********************************************************************/
        }
    }
})()



// 주소 찾기 이벤트리스너 콜백함수
function postCodeButtonCallBack(e) {
    e.preventDefault();
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let addr = ''; // 주소 변수
            let extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }
            
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.querySelector('.postcode').value = data.zonecode;
            document.querySelector(".address1").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.querySelector(".address2").focus();
        }
    }).open();
}


// 구매 상품 HTML 생성 함수
function makeItemHTML(product) {
    return `
    <div class="item-container">
        <div class="product-name-options">
            <div class="image-box"></div>
            <div class="options-box">
                <div class="product-name">${product.productName}</div>
                <div class="options">옵션: ${product.size} / ${product.color}</div>
            </div>
        </div>
        <div class="product-quantity">${product.quantity}</div>
        <div class="total-price">${addCommas(product.price * product.quantity)}</div>
    </div>
    `
}


// 총 결제 금액 구해주는 함수
function getTotalPrice(buyProducts) {
    return buyProducts.reduce((totalPrice, product) => {
        const addPrice = product.price * product.quantity;
        return totalPrice + addPrice;
    }, 0);
}


// 수령자 정보 확인
function getRecipientInfo(...recipientArray) {
    const recipient = recipientArray[0].value.trim();
    const phoneNumber = recipientArray[1].value.trim();
    const postalCode = recipientArray[2].value.trim();
    const address1 = recipientArray[3].value.trim();
    const address2 = recipientArray[4].value.trim()

    if (!recipient) {
        alert('수령인을 입력해주세요!')
        return false;
    }

    if (!phoneNumber) {
        alert('휴대전화를 입력해주세요!');
        return false;
    }

    if (!postalCode) {
        alert('우편번호 및 주소를 입력해주세요!');
        return false;
    }

    if (!address2) {
        alert('상세 주소를 입력해주세요!');
        return false;
    }

    // 주문 완료하고 뒤로가기 후 0원 주문 방지
    if (productIdArray.length === 0) {
        alert('주문할 상품이 없습니다.');
        return false;
    }
    return {
        recipient,
        postalCode,
        address1,
        address2,
        phoneNumber
    }
}


// 구매 상품들의 {productId, option, quantity}를 배열로 반환
function getProductsInfo(buyProducts) {
    return buyProducts.map((product) => ({
        productId: product.productId,
        option: {
            size: product.size,
            color: product.color
        },
        quantity: product.quantity
    }));
}