$(document).on('click', '.choose-star', (e)=> {
    this.star =  $(e.target).attr('data')
    switch (Number(this.star)) {
      case 1:
        $('.text-star').html('Rất tệ')
        break;
      case 2:
        $('.text-star').html('Tệ')
        break;
      case 3:
        $('.text-star').html('Tạm')
        break;
      case 4:
        $('.text-star').html('Tốt')
        break;
      case 5:
        $('.text-star').html('Rất Tốt')
        break;
      default:
        break;
    }
  });