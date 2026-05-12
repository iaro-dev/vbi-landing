'use strict';

const stipend = document.getElementById('stipend');
const stipendVal = document.getElementById('stipend-val');

function updateSlider() {
  const value = Number.parseInt(stipend.value, 10);
  let label = `₿${value.toLocaleString('en-US')} / month`;
  if (value >= 5000) label += ' · national treasure';
  else if (value >= 2500) label += ' · senior vibe coder';
  stipendVal.textContent = label;
}

stipend.addEventListener('input', updateSlider);
updateSlider();

const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const uploadPrompt = document.getElementById('upload-prompt');
const uploadPreview = document.getElementById('upload-preview');

function handleFiles(files) {
  if (!files.length) return;
  uploadPrompt.style.display = 'none';
  uploadPreview.innerHTML = '';

  Array.from(files).forEach((file) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        item.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      const name = document.createElement('div');
      name.className = 'preview-name';
      name.textContent = file.name;
      item.appendChild(name);
    }

    uploadPreview.appendChild(item);
  });
}

fileInput.addEventListener('change', () => handleFiles(fileInput.files));

uploadZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (event) => {
  event.preventDefault();
  uploadZone.classList.remove('drag-over');
  handleFiles(event.dataTransfer.files);
});

const form = document.getElementById('application');
const successPanel = document.getElementById('success');
const appIdSpan = document.getElementById('app-id');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const button = form.querySelector('button');
  const buttonText = button.querySelector('.btn-text');
  const buttonLoading = button.querySelector('.btn-loading');

  buttonText.style.display = 'none';
  buttonLoading.style.display = 'inline';
  button.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    successPanel.style.display = 'block';
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const stamp = Date.now().toString(36).slice(-4).toUpperCase();
    appIdSpan.textContent = `VBI-${random}-${stamp}`;
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 900);
});
