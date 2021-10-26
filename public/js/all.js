const btn = document.querySelector('.btn')

function searchAjax(e){
  e.preventDefault();
  const searchText = document.querySelector('.searchText').value
  const data =  {'content': searchText,array:[1,2,3]};
  console.log(data)
  fetch('/searchAjax',{
    // Ajax 行為改為 Post
    method: 'POST',
    // headers 加入 json 格式
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
      body: JSON.stringify(data)
  })
  .then((response) => {
        // 回傳 ReadableStream 物件，可使用 .json() 等等方法，取得對應資料。
    return response.text()
  }).then((data) => {
    console.log('fetch',data)
  }).catch((err) => {
    console.log('錯誤:', err)
})
}
btn.addEventListener('click',searchAjax)