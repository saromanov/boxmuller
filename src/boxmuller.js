
//Sampling from Box-muller process
export default module = function(mu, sigma, n=1) {
    if(n === 0 || !Number.isInteger(n)) {
        return;
    }
    if(n === 1) {
        return box_muller(mu, sigma).first; 
    }

    let result = [];
    let count = 0;
    while(true) {
        let items = box_muller(mu, sigma);
        const first = items.first;
        result.push(first);
        count+=1;
        if(count === n) {
            return result;
        }

        const second = items.second;
        result.push(second);
        count += 1;
        if(count === n) {
            return result;
        }
    }
  return box_muller(mu, sigma); 
}

let box_muller = function(mu, sigma) {
    let U1 = Math.random();
    let U2 = Math.random();
    let Z0 = box_muller_step(Math.cos, U1, U2);
    let Z1 = box_muller_step(Math.sin, U1, U2);
    let result1 = mu + Z0 * sigma;
    let result2 = mu + Z1 * sigma;
    return {first: result1, second: result2}
}

let box_muller_step = function(func, U1, U2) {
    return Math.sqrt(-2 * Math.log(U1)) * func(2 * Math.PI * U2);
}
