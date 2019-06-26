let add = (bigcart, req) => {
    bigcart.contents.push(req.body);
    return JSON.stringify(bigcart, null, 4);
};
let change = (bigcart, req) => {
    let find = bigcart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(bigcart, null, 4);
};
let remove = (bigcart,req) => {
    let find = bigcart.contents.find(el => el.id_product === +req.params.id);
    bigcart.contents.splice(bigcart.contents.indexOf(find),1);
    return JSON.stringify(bigcart, null, 4);
};

module.exports = {
    add,
    change,
    remove,
};