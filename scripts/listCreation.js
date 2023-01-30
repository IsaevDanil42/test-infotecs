let buf = 10;
let arrayDefoult = [];
let array = [];


async function listCreation(count = 10, sort = "name") {
	
	//проверка для сохранения параметров сортировки или счетчика элементов
    if (count > 0) {
        buf = count;
    }
    if (sort != "state") {
        bufSort = sort
    }

    array = await getArray();

    switch (bufSort) {
        case "name":
            array.splice(buf, 30);
            array.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
            break;
        case "price":
            array.splice(buf, 30);
            array.sort(function(a, b) {
                return b.price - a.price;
            });
            break;
    }

    for (let i = 0; i < buf; i++) {
        let li = document.createElement('li');
        let article = document.createElement('article');
		let imgThumbnail = document.createElement('img');
		let imgMain = document.createElement('img');
        li.append(array[i].title);
        li.append(article);
        article.insertAdjacentHTML('beforeend', '<strong>Brand: </strong>' + array[i].brand + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Category: </strong>' + array[i].category + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Description: </strong>' + array[i].description + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Discount percentage: </strong>' + array[i].discountPercentage + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Price: </strong>' + array[i].price + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Rating: </strong>' + array[i].rating + '<br>');
        article.insertAdjacentHTML('beforeend', '<strong>Stock: </strong>' + array[i].stock + '<br>');
		article.append(imgThumbnail);
		imgThumbnail.src = array[i].thumbnail;
		article.append(imgMain);
		imgMain.src = array[i].images[0];
        if (i > buf - 5 && buf > 5) {
            article.className = "lowElem";
        } else {
			article.className = "highElem";
		}
        li.className = "box";
        li.draggable = "true";
        ul.append(li);
    }
    dragnDrop();
}

async function fetchJSONAsync(url) {
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else
        throw new Error(`${response.status}: ${response.statusText}`);
}

//отдельная функция для сохранения массива, чтобы только один раз сделать обращение к серверу
async function getArray() {
    if (arrayDefoult.length == 0) {
        let obj = await fetchJSONAsync('https://dummyjson.com/products/');
        arrayDefoult = obj.products;
    }
    return [...arrayDefoult];
}

let selectList = document.querySelector('.number');

selectList.addEventListener('change', (event) => {
    ul.innerHTML = "";
    listCreation(event.target.value, "state");
})

let selectSort = document.querySelector('.sort');

selectSort.addEventListener('change', (event) => {
    ul.innerHTML = "";
    listCreation(0, event.target.value);
})

listCreation()