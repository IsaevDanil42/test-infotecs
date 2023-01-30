document.addEventListener("DOMContentLoaded", dragnDrop())

function dragnDrop() {

    function handleDragStart(e) {
        this.style.opacity = '0.5';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd() {
        this.style.opacity = '1';
    }


    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }

    function handleDrop(e) {
        e.stopPropagation();
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            document.getElementById('select').value = "custom";
            swap(this, dragSrcEl);
        }
        return false;
    }

    let items = document.querySelectorAll('.box');
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragover', handleDragOver);
    });
};

function swap (firstElem, secondElem){
	let buf = firstElem.lastChild.className;
	firstElem.lastChild.className = secondElem.lastChild.className;
	secondElem.lastChild.className = buf;
};