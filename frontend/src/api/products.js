import mockData from "../db/mockdata.json";


//simulate a network call with a delay
export const fetchProducts = () => {
    return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });

}

//fetch by id
export const fetchProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = mockData.find((product) => product.id === parseInt(id));
            resolve(product);
            }, 1000);
        
        })
}