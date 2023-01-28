let filters = {},filtersCheck = {};
let dataset = '';
fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
.then(response => response.json())
.then(data => {
  dataset = data;
  console.log(data);

  const filtersValueData = {}
  data.forEach(item => {
    for (let filterType in item.verinfo) {
        if(!filters[filterType]) {
            filters[filterType] = new Set();
            filtersCheck[filterType] = new Set();
        }
        filters[filterType].add(item.verinfo[filterType].customId);
        filtersValueData[item.verinfo[filterType].customId] = item.verinfo[filterType].value;
    }
  });

  createFilterSelectors(filters, filtersValueData);
  createVersionData();
})

function createFilterSelectors(filterTypes, filtersValueData) {
    let filterWrapper = document.querySelector('.version-filters-container');
    let customJs  = "", i=0;
    if(filterWrapper) {
        for (let filter in filterTypes) {
            customJs += `<div class="version-filter-type" data-filter-type="${filter}">`
            for (let type of filterTypes[filter]) {
                customJs += `<div class="version-filter-value" data-filter-value="${type}" 
                                onclick="filterData(event, '${filter}', ${type})">${filtersValueData[type]}</div>`
            }
            customJs +='</div>'
            i++;

        }
        filterWrapper.innerHTML = customJs;
    }
}

function createVersionData(data= dataset) {
    let versionDataWrapper = document.querySelector('.version-data-container');
    let customJs  = "", versionLiData = "", versionTypeDetail = "";
    if(versionDataWrapper) {
        for (let version of data) {
            versionLiData = ""; versionTypeDetail = "";
            for (const key in version.verinfo) {
                versionLiData += `data-${key}="${version.verinfo[key].customId}" `
                versionTypeDetail += `<span class="version-type-data">${version.verinfo[key].value}</span>`
            }
            customJs += `<li class="version-data display-block" ${versionLiData}>
                            <div class="version-info">
                                <p class="version-label">${version.verlabel}</p>
                                <div class="version-type-wrapper">
                                    ${versionTypeDetail}
                                </div>
                            </div>
                            <p class="version-price">${version.verprice}</p>
                        </li>`
        }
        versionDataWrapper.innerHTML = customJs;
    } 
}

let isTrigerredFirst = true, allVersionData;

function filterData(event, filterType, filterValue) {
    if(isTrigerredFirst){
        allVersionData = document.querySelectorAll(".version-data");
    }
    if (filtersCheck[filterType].has(filterValue)) {
        filtersCheck[filterType].delete(filterValue);
        event.target.classList.remove('active');
    } else {
        filtersCheck[filterType].add(filterValue);
        event.target.classList.add('active');
    }

    allVersionData.forEach(item => {
        item.classList.add("display-block")
        for(let selectedFilterType in filtersCheck) {
            if(filtersCheck[selectedFilterType].size && !filtersCheck[selectedFilterType].has(parseInt(item.dataset[selectedFilterType.toLowerCase()], 10)))  {
                item.classList.remove("display-block");
                break;
            }
        }
    });
}