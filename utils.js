// waiting 1s after last letter typing ,  before sending a fetch request
// debounce function (search about it in google)

const deboubce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
       timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay);
    };
};