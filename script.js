// رفتن به صفحه دوم
function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// برگشت به صفحه اول
function goToPage1() {
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page1').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// اضافه کردن عکس به آلبوم
let currentItem = null;
const fileInput = document.getElementById('fileInput');

function addPhoto(item) {
    currentItem = item;
    fileInput.click();
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file || !currentItem) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        currentItem.innerHTML = `<img src="${event.target.result}" alt="عکس آلبوم">`;
        currentItem.classList.remove('empty');
        currentItem.onclick = null;

        // اضافه کردن یه خونه جدید خالی
        const grid = document.getElementById('albumGrid');
        const newItem = document.createElement('div');
        newItem.className = 'album-item empty';
        newItem.innerHTML = '<span>+ اضافه کن</span>';
        newItem.onclick = function() { addPhoto(this); };
        grid.appendChild(newItem);

        // پاک کردن ورودی برای بار بعدی
        fileInput.value = '';
    };
    reader.readAsDataURL(file);
});
// ===== توابع ویدیو =====
function openVideo(src) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('bigVideo');
    video.src = src;
    modal.classList.add('active');
    video.play().catch(e => console.log('خطا:', e));
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('bigVideo');
    video.pause();
    video.currentTime = 0;
    video.src = '';
    modal.classList.remove('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideo();
});

document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target.id === 'videoModal') closeVideo();
});
