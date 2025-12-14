function updateNavUser() {
    var authLink = document.getElementById('nav-auth');
    if (!authLink) return;

    var user = localStorage.getItem('currentUser');
    if (user) {
        authLink.classList.add('user-menu');
        authLink.href = '#';
        authLink.innerHTML =
            '<span class="user-menu-label">Welcome (' +
            user +
            ')</span><span class="user-menu-caret">▼</span>' +
            '<ul class="user-dropdown">' +
            '<li data-action="favorites">Mục yêu thích</li>' +
            '<li data-action="logout">Đăng xuất</li>' +
            '</ul>';
    } else {
        authLink.textContent = 'Đăng nhập / Đăng ký';
        authLink.href = 'auth.html';
    }
}

function setupUserMenu() {
    var authLink = document.getElementById('nav-auth');
    if (!authLink) return;

    var dropdown = authLink.querySelector('.user-dropdown');
    if (!dropdown) return;

    dropdown.addEventListener('click', function (e) {
        var item = e.target.closest('li');
        if (!item) return;

        var action = item.getAttribute('data-action');
        if (action === 'favorites') {
            localStorage.setItem('openFavorites', '1');
            window.location.href = 'media.html';
        } else if (action === 'logout') {
            localStorage.removeItem('currentUser');
            alert('Bạn đã đăng xuất.');
            window.location.href = 'index.html';
        }
    });
}

function clearContactErrors() {
    document.getElementById('contact-name-error').textContent = '';
    document.getElementById('contact-email-error').textContent = '';
    document.getElementById('contact-message-error').textContent = '';
    document.getElementById('contact-both-error').textContent = '';
}

window.addEventListener('DOMContentLoaded', function () {
    updateNavUser();
    setupUserMenu();

    var form = document.getElementById('contact-form');
    var statusEl = document.getElementById('contact-status');

    if (!form || !statusEl) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ các ô đang có trong lienhe.html
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('phone').value.trim(); // dùng ô này làm gmail
        var msg = document.getElementById('message').value.trim();

        // Xóa thông báo cũ
        statusEl.textContent = '';
        statusEl.className = 'contact-status';

        // Kiểm tra tên và gmail
        if (!name && !email) {
            statusEl.textContent = 'Vui lòng nhập cả Họ tên và Gmail.';
            statusEl.className = 'contact-status error';
            return;
        }

        if (!name) {
            statusEl.textContent = 'Vui lòng nhập Họ tên.';
            statusEl.className = 'contact-status error';
            return;
        }

        if (!email) {
            statusEl.textContent = 'Vui lòng nhập email.';
            statusEl.className = 'contact-status error';
            return;
        }

        if (!msg) {
            statusEl.textContent = 'Vui lòng nhập Nội dung.';
            statusEl.className = 'contact-status error';
            return;
        }

        // Tạo URL mở trang Gmail (soạn mail mới)
        var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
            encodeURIComponent(email) +
            '&su=' + encodeURIComponent('Liên hệ từ ' + name) +
            '&body=' + encodeURIComponent(msg);

        // Chuyển trình duyệt sang Gmail
        window.location.href = gmailUrl;
    });
});