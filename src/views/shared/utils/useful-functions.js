// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
	return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
	return parseInt(string.replace(/(,|개|원)/g, ''));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
	return new Promise((r) => setTimeout(r, ms));
};


export const maskingFunc = {
	checkNull: function (str) {
		if (typeof str == "undefined" || str == null || str == "") {
			return true;
		}
		else {
			return false;
		}
	},

	email(str) {
		let originStr = str;
		let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		let strLength;

		if (this.checkNull(originStr) == true || this.checkNull(emailStr) == true) {
			return originStr;
		} else {
			strLength = emailStr.toString().split('@')[0].length - 3;

			// ex1) abcdefg12345@naver.com => ab**********@naver.com
			// return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*');

			// ex2) abcdefg12345@naver.com => ab**********@nav******
			return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*').replace(/.{6}$/, "******");
		}
	},

	name(str) {
		let originStr = str;
		let maskingStr;
		let strLength;

		if (this.checkNull(originStr) == true) {
			return originStr;
		}

		strLength = originStr.length;

		if (strLength < 3) {
			maskingStr = originStr.replace(/(?<=.{1})./gi, "*");
		} else {
			maskingStr = originStr.replace(/(?<=.{2})./gi, "*");
		}

		return maskingStr;
	}
}

// 날짜 전처리
export const getDate = (orderDate) => {
	let [date, time] = orderDate.split('T');
	date = date.replaceAll('-', '.');
	time = time.split('.')[0];
	return `${date} ${time}`;
}

//쿠기 값 삭제
export const deleteCookie = (key) => {
	document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};