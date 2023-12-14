    // Lắng nghe sự kiện onchange khi người dùng chọn file
    document.getElementById('imageInput').addEventListener('change', function (event) {
        // Lấy thẻ <img> để hiển thị ảnh
        const previewImage = document.getElementById('previewImage');
  
        // Kiểm tra xem người dùng đã chọn file chưa
        if (event.target.files.length > 0) {
          // Lấy tệp tin
          const file = event.target.files[0];
  
          // Tạo một đường dẫn URL tạm thời cho file
          const objectURL = URL.createObjectURL(file);
  
          // Hiển thị ảnh và hiển thị thẻ <img>
          previewImage.src = objectURL;
          previewImage.style.display = 'block';
  
          // Tự giải phóng đường dẫn URL khi không cần thiết nữa
          previewImage.onload = function () {
            URL.revokeObjectURL(objectURL);
          };
        } else {
          // Nếu không có file được chọn, ẩn thẻ <img>
          previewImage.style.display = 'none';
        }
      });
  