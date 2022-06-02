// pagination 모듈화
async function pagination(page, perPage, model, filter, select, sort, populate) {
    // total, datas를 Promise.all을 사용해 동시에 호출
    const [total, datas] = await Promise.all([
        model.countDocuments(filter),     // 해당 카테고리의 전체 상품 수 쿼리
        model.find(filter, select)
            .sort(sort)
            .skip(perPage * (page - 1))
            .limit(perPage)
            .populate(populate)
    ])
    const totalPage = Math.ceil(total / perPage);

    return ({ datas, page, perPage, totalPage });
}

export { pagination };