// URLのパスからパンくずを自動生成
const pathArray = window.location.pathname.split('/').filter(p => p !== "" && p !== "index.html");
const breadcrumbs = document.getElementById('breadcrumbs');

let html = '<a href="/">ホーム</a>';
let currentPath = '';

// パス名と表示名のマッピング
const nameMap = {
    "essay": "Essay",
    "note": "雑記",
    "sampo": "散歩日記",
    "review": "Review",
    "work": "Work",
    "tanka": "短歌"
};

const pageTitle = document.title.split('|')[0].trim();

pathArray.forEach((path, index) => {
    currentPath += `/${path}`;
    const displayName = nameMap[path] || path;

    html += ' > ';
    if (index === pathArray.length - 1) {
        // 現在のページ（リンクにしない）
        html += `<span>${pageTitle}</span>`;
    } else {
        // 途中のディレクトリ
        html += `<a href="${currentPath}/">${displayName}</a>`;
    }
});

breadcrumbs.innerHTML = html;