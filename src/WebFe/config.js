const URL_API = "http://localhost:8080/";

// search
function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbProduct");
    tr = table.getElementsByTagName("tr");
    console.log(tr)
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
// Delete
function remove(id) {
    if (confirm("you are sure?")) {
        $.ajax({
            type: "DELETE",
            url: URL_API + "/products?id=" + id,
            success: function () {

                init()
            }
        });
    } else {
        init()
    }

}
// show button delete
var count = 0
function showButtonDelete(id) {
    var checkID = id + ""
    var thead = $("#deleteProduct thead")
    count++
    thead.empty();
    thead.append($('<tr>'), $('<td>').append(('<input type="button" onclick="deleteMulti()" class="btn btn-primary" value="DELETE ALL">')))
    document.getElementById(checkID).onclick = function (e) {
        if (this.checked) {
            count++
            thead.empty();
            thead.append($('<tr>'), $('<td>').append(('<input type="button" onclick="deleteMulti()" class="btn btn-primary" value="DELETE ALL">')))
        } else {
            count--
            if (count < 1) {
                thead.empty()
            }

        }
    };
}
//xóa nhiều
function deleteMulti() {
    var arr = [];
    $(":checked").each(function () {
        arr.push(parseInt($(this).val()));
    });
    var data = {}
    data.ids = arr
    var dataObj = JSON.stringify(data)
    console.log(data)
    $.ajax({
        url: "http://localhost:8080/products/arr",
        type: "POST",
        data: dataObj,
        contentType: 'application/json;charset=utf-8',
        success: function () {
            init()
        }, error: function () {
            alert(false)
        }
    })
}
// --------------sort-------------

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tbProduct");
    switching = true;
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[2];
            y = rows[i + 1].getElementsByTagName("td")[2];
            console.log(x)
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

//get product by id

function getProductById(id) {
    $.ajax({
        url: URL_API + "/products/product?id=" + id,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            $('#id').val(data.data.id)
            $('#name').val(data.data.name)
            $('#price').val(data.data.price)
            $('#image').val(data.data.image)
            $('#categoryId').val(data.data.categoryId)

        }, error: function () {
            alert("error")
        }
    })

}
// create and update
$(document).ready(function () {
    var product = {}
    var linkUrl = "";
    var methodName = "";
    $('#create').click(function () {
        $('#id').val("")
    })
    $('#product').click(function () {
        product.name = $("#name").val()
        product.price = $("#price").val()
        product.image = $("#image").val()
        var productId = $("#id").val()
        if (productId) {
            linkUrl = URL_API + "/products/update"
            methodName = "PUT"
            product.id = productId
        } else {
            product.id = Math.floor(Math.random() * 10000)
            methodName = "POST"
            linkUrl = URL_API + "/products/create"
        }
        product.categoryId = $("#categoryId").val()
        var productObj = JSON.stringify(product)
        $.ajax({
            url: linkUrl,
            type: methodName,
            data: productObj,
            contentType: 'application/json;charset=utf-8',
            success: function () {
                init()

            }
        })
    })
})

//phân trang
var state = {
    'querySet': "",
    'page': 1,
    'rows': 5,
    'window': 5,
}

function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    var trimData = querySet.slice(trimStart, trimEnd)
    var index = querySet.length / rows
    var pages = Math.round(querySet.length / rows)
    if (pages < index && index < (pages + 0.5)) {
        pages = pages + 1
    }
    return {
        'querySet': trimData,
        'pages': pages,
    }

}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')
    wrapper.innerHTML = ``

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))
    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = pages

    }
    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }
    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }
    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function () {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}

function buildTable() {
    var tbBody = $("#tbProduct tbody");
    var data = pagination(state.querySet, state.page, state.rows)
    var list = data.querySet
    tbBody.empty();
    $.each(list, function (i, item) {

        tbBody.append($('<tr>').append($('<td>').append(('<input type="checkbox" name="product[]" id="' + item.id + '" value="' + item.id + '" onclick="showButtonDelete(' + item.id + ')">')),
            $('<td>').text(item.id),
            $('<td>').text(item.name),
            $('<td>').text(item.categoryId),
            $('<td>').text(item.price),
            $('<td>').text(item.image),
            $('<td>').append((' <button type="button"  class="btn btn-primary" onclick="getProductById(' + item.id + ')" data-toggle="modal" data-target="#exampleModal">Edit</button>')),
            $('<td>').append(('<button type="button" style="background-color: red!important;" class="btn btn-primary" onclick="remove(' + item.id + ')"  >DELETE</button>')),)
        )

    })

    pageButtons(data.pages)
}

function init() {

    $.ajax({
        type: "GET",
        url: URL_API + "/products",

        success: function (responce) {
            var productList = []
            $.each(responce.data, function (i, item) {
                productList.push(item)
            })
            console.log(productList)
            state.querySet = productList
            buildTable()

        },
        error: function () {

        }
    });
}

init()
