# Một chút thương gửi bà và dì

Bản xuất từ mã nguồn thực tế của website hiện tại, không tái dựng từ trang công khai.
Dự án HTML/CSS/JavaScript tĩnh, không dùng React/Vite, không cần npm hay build.

## Bản được giữ lại

74 ảnh thật: 67 ảnh ban đầu và 7 ảnh thêm vào mục 06 “Gia đình mình”. Không có lớp anime đang hoạt động. Giữ nguyên ảnh, thứ tự, caption, hai lá thư, bố cục, màu sắc, font nhúng và hiệu ứng hoa của bản hiện tại. Các ảnh anime và mã thử nghiệm không còn được sử dụng không được đưa vào bản xuất.

Chỉ sửa cơ chế đọc `#trang-N` để liên kết trực tiếp và tải lại mở đúng trang. Ví dụ `#trang-10` mở phần hai lá thư. Không thêm animation mới. Không thay màu nền dựa theo ảnh chụp màn hình hay chế độ tối của trình duyệt.

## Xuất bản sau khi đã đồng ý công khai ảnh

1. Đăng nhập GitHub, tạo repository `mot-chut-thuong`. Chọn Public nếu dùng GitHub Pages trên tài khoản miễn phí. Ảnh, thư và caption trong repository công khai có thể được người khác xem/tải xuống.
2. Giải nén ZIP. Upload **nội dung bên trong** thư mục `mot-chut-thuong`, để `index.html` ở gốc repository, không upload nguyên file ZIP.
3. Có thể dùng GitHub Desktop: tạo repository tại thư mục đã giải nén, commit các file rồi Publish repository. Cách này giữ được cả file `.nojekyll` và các thư mục con.
4. Vào **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
5. Chọn branch **main**, thư mục **/(root)**, bấm **Save**.
6. Chờ GitHub hoàn tất triển khai. Lấy địa chỉ thực tế hiển thị trong Settings → Pages: `https://<tên-tài-khoản>.github.io/mot-chut-thuong/`.

Không cần GitHub Actions tùy chỉnh vì toàn bộ website là file tĩnh. Khi commit thay đổi lên nhánh main, Pages sẽ xuất bản lại.
Tài liệu chính thức: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Chạy trên máy

Trong thư mục này, chạy `python -m http.server 8000`, rồi mở `http://localhost:8000/`.
Không mở trực tiếp index.html bằng file:// vì trình duyệt có thể chặn đọc JSON.

## Cập nhật sau này

- Caption/thứ tự: `photos.json`. Mỗi mục nối `src` với `caption`; giữ `number` liên tiếp từ 1.
- Hai lá thư: `letters.json`; giữ cấu trúc JSON hợp lệ và các thẻ `<p>`.
- Ảnh: `assets/`. Nếu thêm ảnh, thêm bản ghi trong `photos.json` và cập nhật giới hạn nhóm tương ứng trong mảng `chapters` của `app.js`.
- Lời mở đầu/kết: `index.html`; lời chúc ngẫu phiên và xử lý tương tác: `app.js`.
- Kiểu dáng: `style.css`; font đã nằm trong `assets/fonts`, kèm giấy phép.
- Sau khi sửa JSON/JS/CSS, tăng số `?v=` tương ứng trong app.js/index.html để tránh bản lưu cũ.

## Kiểm tra sau khi xuất bản

Mở trang chủ và `#trang-10`, tải lại, thử nút trước/sau và Back/Forward; kiểm tra đủ 74 ảnh, caption, 2 thư và hiệu ứng hoa. Thử điện thoại/tablet, Chrome/Edge/Firefox và kiểm tra Network không có tài nguyên 404. Các kiểm tra thực tế này chưa được thực hiện trên GitHub vì bản xuất chưa được xuất bản.

Font cùng nguồn được đóng gói để tránh phụ thuộc font máy; việc khử răng cưa có thể vẫn khác giữa hệ điều hành/trình duyệt. Bản chuẩn bị chưa được kiểm thử bằng trình duyệt hoặc so sánh screenshot.

Không chứa Git history, thông tin đăng nhập, API key, cấu hình nội bộ Sites hay nội dung hội thoại. Website Sites gốc chưa bị thay đổi hoặc tắt.
