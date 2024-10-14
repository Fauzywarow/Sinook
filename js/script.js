// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box

const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');
let productVideo; // Variabel global untuk menyimpan elemen iframe

// Fungsi untuk memulai pemutaran video
function playVideo() {
  productVideo = document.querySelector('#product-video');
  productVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

// Fungsi untuk menghentikan pemutaran video
function pauseVideo() {
  if (productVideo) {
    productVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
}

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    playVideo(); // Memulai pemutaran video saat modal ditampilkan
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  pauseVideo(); // Menghentikan pemutaran video saat tombol close diklik
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// Menangani penutupan modal saat animasi transisi selesai
itemDetailModal.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'opacity' && itemDetailModal.style.opacity === '0') {
    pauseVideo(); // Menghentikan pemutaran video saat modal ditutup sepenuhnya
  }
});

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    pauseVideo(); // Menghentikan pemutaran video saat area di luar modal diklik
    itemDetailModal.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const itemDetailModal = document.querySelector('#item-detail-modal');
  const itemDetailButtons = document.querySelectorAll('.item-detail-button');
  const closeButton = document.querySelector('.modal .close-icon');

  itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
      itemDetailModal.style.display = 'block';
      e.preventDefault();
    };
  });

  closeButton.onclick = (e) => {
    pauseVideo(); // Menghentikan pemutaran video saat tombol close diklik
    itemDetailModal.style.display = 'none';
    e.preventDefault();
  };

  window.onclick = (e) => {
    if (e.target === itemDetailModal) {
      pauseVideo(); // Menghentikan pemutaran video saat area di luar modal diklik
      itemDetailModal.style.display = 'none';
    }
  };
});


// contact section
document.addEventListener('DOMContentLoaded', function () {
  const kirimBtn = document.getElementById('kirimBtn');
  const namaInput = document.getElementById('namaInput');
  const pesanInput = document.getElementById('pesanInput');
  const noHpInput = document.getElementById('noHpInput');

  kirimBtn.addEventListener('click', function () {
    const namaValue = namaInput.value.trim();
    const pesanValue = pesanInput.value.trim();
    const noHpValue = noHpInput.value.trim();

    if (!namaValue || !pesanValue || !noHpValue) {
      alert('Harap lengkapi semua kolom!');
      return;
    }

    if (!/^\d+$/.test(noHpValue)) {
      alert('Harap masukkan hanya angka pada kolom nomor HP!');
      return;
    }

    const message = `Nama: ${namaValue} Pesan: ${pesanValue} No HP: ${noHpValue}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=6285656998799&text=${encodeURIComponent(message)}`; // Ganti NOMOR_WHATSAPP_OWNER dengan nomor WhatsApp owner
    window.open(whatsappLink, '_blank');
    document.getElementById('contactForm').reset(); // Reset form setelah mengirim pesan
  });
});



      // Fungsi untuk pencarian dan pengarahan ke bagian menu
      function searchMenu() {
        const searchTerm = document.getElementById('search-box').value.toLowerCase().trim();
        const menuItems = document.querySelectorAll('.menu-card');
    
        let found = false;
        menuItems.forEach((menuItem) => {
          const itemName = menuItem.dataset.name.toLowerCase();
          if (itemName.includes(searchTerm)) {
            menuItem.scrollIntoView({ behavior: 'smooth' });
            found = true;
          }
        });
    
        if (!found) {
          alert('Menu tidak ditemukan!');
        }
      }
    
      // Tambahkan event listener untuk icon pencarian saat dokumen selesai dimuat
      document.addEventListener('DOMContentLoaded', function() {
        const searchIcon = document.getElementById('search-icon');
        searchIcon.addEventListener('click', function(event) {
          event.preventDefault(); // Menghindari default action dari label saat diklik
          searchMenu(); // Panggil fungsi pencarian saat icon pencarian diklik
        });
      });
  