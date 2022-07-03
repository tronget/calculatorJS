const result = document.querySelector(".result");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const powBtn = document.querySelector(".pow");
const cancelBtn = document.querySelector(".cancel");
const rootBtn = document.querySelector(".sqrt");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equal");
const floatBtn = document.querySelector(".float");
const operatorsArray = ['*', '/', '+', '-'];
let flag = true;
window.addEventListener('click', () => {
	if (result.textContent === '' || result.textContent === 'Error') {
		flag = true
		return result.textContent = '0'
	}
})
for (let i of [nums, operators]) {
	i.forEach((item) => {
		item.addEventListener('click', logResult)
	})
}
delBtn.addEventListener('click', () => {
	if (flag) {
		if (result.textContent !== '0') {
			result.textContent = result.textContent.slice(0, -1);
		}
	}
})


cancelBtn.addEventListener('click', () => result.textContent = '0')
rootBtn.addEventListener('click', () => {
	if (checkResult()) {
		result.textContent = Math.sqrt(Number(result.textContent))
	}
})
powBtn.addEventListener('click', () => {
	if (checkResult()) {
		result.textContent = Math.pow(Number(result.textContent), 2)
	}
})
floatBtn.addEventListener('click', logFloat)
equalBtn.addEventListener('click', equalResult)



// Functions

function logResult(e) {
	if (flag) {
		if (operatorsArray.includes(e.target.textContent)) {
			if (operatorsArray.includes(result.textContent.slice(-1))) {
				return result.textContent = result.textContent.slice(0, -1) + e.target.textContent;
			}
			if (!checkResult()) {
				equalResult();
			}
			if (result.textContent === '0') {
				result.append(e.target.textContent)
				return;
			}
		}
		if (result.textContent === '0') {
			result.textContent = '';
		}
		result.append(e.target.textContent);
	}
}

function checkResult() {
	return (!isNaN(Number(result.textContent)))
}

function equalResult() {
	if (flag) {
		if (!checkResult()) {
			let resultArr = [];
			for (let i of result.textContent) {
				if (isNaN(Number(i))) {
					resultArr = result.textContent.split(i); 
					console.log(resultArr)
					if (i === '/' && resultArr[1] === '0') {
						flag = false;
						return setTimeout(() => result.textContent = 'Error', 10)
					}
					if (i === '+') {
						return result.textContent = Number(resultArr[0]) + Number(resultArr[1]);
					}
					if (i === '-') {
						return result.textContent = Number(resultArr[0]) - Number(resultArr[1]);
					}
					if (i === '/') {
						return result.textContent = Number(resultArr[0]) / Number(resultArr[1]);
					}
					if (i === '*') {
						return result.textContent = Number(resultArr[0]) * Number(resultArr[1]);
					}
				}
			}
		}
	}
}

function logFloat() {
	if (!isNaN(Number(result.textContent.slice(-1)))) {
		result.append('.')
	}
}