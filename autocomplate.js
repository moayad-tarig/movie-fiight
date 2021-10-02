const creatAutoComplate = ({ 
     root,
     renderOption,
     onOptionSelect,
     inputValue,
     fetchData 
    }) => {

root.innerHTML = `
    <lable><b>Search</b></lable>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const dropdown = root.querySelector(".dropdown");
const resultWrapper = root.querySelector(".results")
const input = root.querySelector("input");
const onInput = async event => {
const items = await fetchData(event.target.value);

if(!items.length){
    dropdown.classList.remove('is-active');
    return;
}

resultWrapper.innerHTML = "";
dropdown.classList.add('is-active')

for (let item of items){
     const option = document.createElement('a');
    const imgSrc = item.Poster === 'N/A'? '' : item.Poster;
    option.classList.add('dropdown-item')
     option.innerHTML =  renderOption(item);

     option.addEventListener('click', ()=>{
         dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
    })
     resultWrapper.appendChild(option);
 }
};
input.addEventListener('input',deboubce(onInput, 1000));
document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})

}