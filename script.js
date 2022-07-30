function getItemAndUpdate() {
    tit = document.getElementById('text').value;
    des = document.getElementById('descriptionBox').value;
    if (localStorage.getItem('itemJson') == null) {
        itemJasonArray = [];
        itemJasonArray.push([tit, des]);
        localStorage.setItem('itemJson', JSON.stringify(itemJasonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemJson');
        // Now we have to parse string into object
        itemJasonArray = JSON.parse(itemJsonArrayStr);
        itemJasonArray.push([tit, des]);
        localStorage.setItem('itemJson', JSON.stringify(itemJasonArray));
    }
    update();
}
// Creating a function so that changes ocurs all the time
function update() {
    if (localStorage.getItem('itemJson') == null) {
        itemJasonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJasonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemJson');
        // Now we have to parse string into object
        itemJasonArray = JSON.parse(itemJsonArrayStr);

    }
    // Populating Table 
    tableBody = document.getElementById("tableBody");
    let str = "";
    // Adding whole html into str
    itemJasonArray.forEach((element, index) => {
        str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-primary" id="add" onclick="deleted(${index})">Delete</button></td>
                    </tr>
                `
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getItemAndUpdate);
update();
// Creating fuction for deleting item
function deleted(itemIndex) {
    console.log("Deleted", itemIndex)
    // Now fatching itemJsonArray by using splice() method
    itemJsonArrayStr = localStorage.getItem('itemJson');
    itemJasonArray = JSON.parse(itemJsonArrayStr);
    itemJasonArray.splice(itemIndex, 1);

    // Now Deleting Item index
    localStorage.setItem('itemJson', JSON.stringify(itemJasonArray));
    // again calling update method
    update();
}
function clearStorage() {
    if (confirm("Are You Sure?")) {
        localStorage.clear();
        update();
    }
}
