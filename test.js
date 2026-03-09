const createElemetn = (arr) => {
    const htmlEle = arr.map((el) => `<span class="btn">${el}</span>`)
    console.log(htmlEle.join(' '));
}



const synoname= ['heo', 'youu', 'asdf'];
createElemetn(synoname);