//  Using arrays logic

let selectedFilters = {
    fuelType: [],
    TransimissionType: [],
    SeaterType: []
};

const filterData = (filterType, filterValue) => {
    if(selectedFilters[filterType].includes(filterValue)){
        selectedFilters[filterType] = selectedFilters[filterType].filter(val => val !== filterValue);
    }else{
        selectedFilters[filterType].push(filterValue);
    }
    let filteredData = variantData.filter(variant => {
        let match = true;
        for(let key in selectedFilters){
            if(selectedFilters[key].length>0 && !selectedFilters[key].includes(variant.verinfo[key].value)){
                match = false;
                break;
            }
        }
        return match;
    });
    // code to update the table with the filtered data
};

//  Using direct chack removing the for loop

let filtersSet = {
    fuelType: new Set(),
    TransimissionType: new Set(),
    SeaterType: new Set()
};

function filterData(filterType, filterValue) {
    if (filtersSet[filterType].has(filterValue)) {
        filtersSet[filterType].delete(filterValue);
    } else {
        filtersSet[filterType].add(filterValue);
    }

    let filteredData = data.filter(item => {
        return (
            (!filtersSet.fuelType.size || filtersSet.fuelType.has(item.fuelType)) &&
            (!filtersSet.TransimissionType.size || filtersSet.TransimissionType.has(item.TransimissionType)) &&
            (!filtersSet.SeaterType.size || filtersSet.SeaterType.has(item.SeaterType))
        );
    });
    // display filtered data
}


// First Type using set and dynamic data

let filters = {};

function filterData(filterType, filterValue) {
    if (!filters[filterType]) {
        filters[filterType] = new Set();
    }

    if (filters[filterType].has(filterValue)) {
        filters[filterType].delete(filterValue);
    } else {
        filters[filterType].add(filterValue);
    }

    let filteredData = data.filter(item => {
        let include = true;
        for (const filterType in filters) {
            if (!filters[filterType].size) {
                continue;
            }
            if (!filters[filterType].has(item[filterType])) {
                include = false;
                break;
            }
        }
        return include;
    });
    // display filtered data
}
