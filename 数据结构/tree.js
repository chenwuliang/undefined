const list = [

    {id: 6},
    
    {id: 2, children: [5]},
    
    {id: 13},
    
    {id: 5, children: [10, 11]},
    
    {id: 1, children: [2, 3, 4]},
    
    {id: 10},
    
    {id: 8, children: [13]},
    
    {id: 4, children: [8, 9]},
    
    {id: 9},
    
    {id: 3, children: [6, 7]},
    
    {id: 11, children: [14]},
    
    {id: 14},
    
    {id: 7, children: [12]},
    
    {id: 12} 
]
let res = []
function find(id) {
    list.forEach(ele => {
        if (ele.children?.includes(id)) {
            res.unshift(ele.id)
            find(ele.id)
        }
    })
    return res
}