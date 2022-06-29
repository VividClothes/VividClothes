export const handleResize = (e, timer, perPage) => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        perPage = getPerPage(e.target.innerWidth)
        console.log(e.target.innerWidth, perPage)
    }, 200);

    return [timer, perPage];
};

export const getPerPage = (width) => {
    if (width <= 960) return 12;
    else if (width <= 1320) return 18;
    else return 24;
}

export const getBestItems = (items) => {
    return items.map((item) => {
        return {
            category: item.product.category.categoryName,
            imagePath: item.product.imagePath[0],
            productId: item.product._id,
            productName: item.product.productName,
            price: item.product.price,
            info: item.product.info,
        };
    });
}

export const getRecentItems = (items) => {
    return items.map((item) => {
        return {
            imagePath: item.imagePath[0],
            productId: item._id,
            productName: item.productName,
            price: item.price,
            info: item.info,
        };
    });
}


export const makeMainImageHTML = (bestItems) => {
    return `
    <div class="img1"
    style='background-image: url("${bestItems[0].imagePath}")'
    onclick='window.location.href="/product?id=${bestItems[0].productId}"'>
      <div class="imgFloat"><div>BEST ${bestItems[0].category}</div></div>
    </div>
    <div class="img2"
    style='background-image:url("${bestItems[1].imagePath}")'
    onclick='window.location.href="/product?id=${bestItems[1].productId}"'>
      <div class="imgFloat"><div>BEST ${bestItems[1].category}</div></div>
    </div>
    <div class="img3"
    style='background-image:url("${bestItems[2].imagePath}")'
    onclick='window.location.href="/product?id=${bestItems[2].productId}"'>
      <div class="imgFloat"><div>BEST ${bestItems[2].category}</div></div>
    </div>
    <div class="img4"
    style='background-image:url("${bestItems[3].imagePath}")'
    onclick='window.location.href="/product?id=${bestItems[3].productId}"'>
      <div class="imgFloat"><div>BEST ${bestItems[3].category}<div></div>
    </div>
    `;
}

export const makeProductCardHTML = ({ productId, productName, price, imagePath, info }) => {
    return `
    <li class="col">
    <a class="a-link" href=/product?id=${productId}&page=1>
      <div class="card">
        <div class="card-image">
          <div class="img-container">
            <img class="grid-img" src=${imagePath} alt=${productName} />
            <div class="buynow">Buy Now</div>
          </div>
        </div>
      </a>
        
        <div>
          <div class="medias">
            <div class="media-content">
              <a class="a-link" href=/product?id=${productId}&page=1><p class="title font-16">${productName}</p></a>
            </div>
          </div>

          <div class="contents">
            <p class="subtitle"><i class="fa-solid fa-won-sign"></i> ${price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </li>`;
}

export const renderNewProducts = async (products, productGrid) => {
    const newProducts = products.map(makeProductCardHTML).join('');
    productGrid.insertAdjacentHTML('beforeend', newProducts);
}