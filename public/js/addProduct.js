$(document).on('change','input[name="thumb"]',function(e){
    console.log(e);
    const fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    
    fileReader.onload = function() {
      const url = fileReader.result
      $('#showImg').attr('src',url)
    }
})