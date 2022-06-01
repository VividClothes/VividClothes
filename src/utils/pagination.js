// pagination 모듈화
async function pagination(model, filter, select, sort, page = 1, perPage = 10) {
    // total, objects를 Promise.all을 사용해 동시에 호출
    const [total, objects] = await Promise.all([
        model.countDocuments(filter),     // 해당 카테고리의 전체 상품 수 쿼리
        model.find(filter, select)
            .sort(sort)
            .skip(perPage * (page - 1))
            .limit(perPage)
    ])
    const totalPage = Math.ceil(total / perPage);

    return ({ objects, page, perPage, totalPage });
}

export {pagination};