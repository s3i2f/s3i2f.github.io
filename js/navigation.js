document.addEventListener('DOMContentLoaded', () => {
    const prevBox = document.getElementById('prev-article');
    const nextBox = document.getElementById('next-article');

    // ナビゲーション用の要素が存在しないページでは実行しない
    if (!prevBox && !nextBox) return;

    // 現在のパスから末尾のファイル名（ID名）を抽出（例: "/work/tanka/261002_shiroatonite.html" -> "261002_shiroatonite"）
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return;

    const currentFileName = pathSegments[pathSegments.length - 1].replace(/\.html$/, '');

    // パスからカテゴリ（ディレクトリ名）を推定（例: "/work/tanka/..." -> "tanka"）
    const currentCategorySlug = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : null;

    // siteData.articles 内の url からもファイル名を抽出してマッチングする関数
    const getFileName = (url) => url.split('/').filter(Boolean).pop().replace(/\.html$/, '');

    // 対象のカテゴリで絞り込み（カテゴリが推測できない場合は全記事）
    let targetArticles = siteData.articles;
    if (currentCategorySlug) {
        targetArticles = targetArticles.filter(a => {
            const articleCategory = a.categorySlug || a.category;
            return articleCategory === currentCategorySlug;
        });
    }

    // 現在の記事のインデックスを特定
    const currentIndex = targetArticles.findIndex(a => getFileName(a.url) === currentFileName);

    if (currentIndex !== -1) {
        // 配列は「新しい順」。
        // 古い記事（前） ＝ インデックスが大きい方 (+1)
        if (currentIndex < targetArticles.length - 1) {
            const prev = targetArticles[currentIndex + 1];
            prevBox.innerHTML = `<a href="${prev.url}">« 前の記事：${prev.title}</a>`;
        }
        // 新しい記事（次） ＝ インデックスが小さい方 (-1)
        if (currentIndex > 0) {
            const next = targetArticles[currentIndex - 1];
            nextBox.innerHTML = `<a href="${next.url}">次の記事：${next.title} »</a>`;
        }
    }
});