const appId="4b96aaf2";
const appkey="e7346cb59c964c76daadf0a94db5f19b";
const recipeContainer=document.querySelector('#recipe-container');
const txtSearch=document.getElementById('txtSearch');
const baseUrl=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appkey}`;
const btnFind=document.querySelector('.btn');
/*https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=4b96aaf2&app_key=e7346cb59c964c76daadf0a94db5f19b*/


const setScrollPosition=()=>{
    recipeContainer.scrollTo({top:0,behavior:"smooth"});
}

btnFind.addEventListener("click",()=>{
    loadRecipies(txtSearch.value);
});


txtSearch.addEventListener("keyup",(e)=>{
    const inputVal=txtSearch.value;
    if(e.keyCode===13){
        loadRecipies(inputVal);
    }
});

function loadRecipies(type="paneer"){
    const url=baseUrl+`&q=${type}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>renderRecipies(data.hits))
    .catch((error)=>console.log(error))
    .finally(setScrollPosition);
}

loadRecipies();

const getRecipeStepStr=(ingredientLines=[])=>{
    let str="";
    ingredientLines.forEach(step=>{
        str=str+`<li>${step}</li>`
    });
    return str;
}
const renderRecipies=(recipeList=[])=>{
    recipeContainer.innerHTML="";
    recipeList.forEach(recipeObj=>{
        const {
            label:recipeTitle,
            ingredientLines,
            image:recipeImage,
        }=recipeObj.recipe;

        const recipeStepStr=getRecipeStepStr(ingredientLines);
        const htmlStr=`<div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" alt="Recipe" class="ckk">
        </div>
        <div class="recipe-text">
            <ul>
                ${recipeStepStr}
                
            </ul>
        </div>
    </div>`;

    recipeContainer.insertAdjacentHTML("beforeend",htmlStr);
    });
}