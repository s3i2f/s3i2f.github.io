/**
 * カテゴリ別記事一覧およびタグフィルタの初期化関数
 * @param {string} targetCategory - 表示したいカテゴリ（site-data.js内のcategoryと一致するもの）
 */
function initCategoryPage(targetCategory) {
    // 1. 対象カテゴリの記事を抽出
    const categoryArticles = siteData.articles.filter(article => article.category === targetCategory);

    // 2. 存在するすべてのタグを抽出（重複なし）
    const allTags = [...new Set(categoryArticles.flatMap(article => article.tags || []))];

    const tagContainer = document.getElementById('tag-buttons');
    const listContainer = document.getElementById('article-list');

    if (!tagContainer || !listContainer) return;

    // 3. 記事一覧を描画する関数
    function renderArticles(articles) {
        listContainer.innerHTML = '';

        if (articles.length === 0) {
            listContainer.innerHTML = '<li class="no-articles">該当する記事はありません。</li>';
            return;
        }

        articles.forEach(item => {
            const tagsHtml = (item.tags || [])
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');

            // URLが存在する場合はリンク化、存在しない場合はテキストのみ
            const titleHtml = (item.url && item.url.trim() !== '')
                ? `<a href="${item.url}">${item.title}</a>`
                : `<span class="update-text">${item.title}</span>`;

            listContainer.innerHTML += `
                <li>
                    <span class="date">${item.date}</span>
                    ${titleHtml}
                    <div class="tags-wrapper">${tagsHtml}</div>
                </li>
            `;
        });
    }

    // 4. タグボタンの生成
    tagContainer.innerHTML = '';

    // 「すべて」ボタン
    const allBtn = document.createElement('button');
    allBtn.textContent = 'すべて';
    allBtn.classList.add('active'); // 初期状態でアクティブ化
    allBtn.addEventListener('click', () => {
        setActiveButton(allBtn);
        renderArticles(categoryArticles);
    });
    tagContainer.appendChild(allBtn);

    // 各タグボタン
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = tag;
        btn.addEventListener('click', () => {
            setActiveButton(btn);
            const filtered = categoryArticles.filter(article => (article.tags || []).includes(tag));
            renderArticles(filtered);
        });
        tagContainer.appendChild(btn);
    });

    // アクティブなボタンのスタイル切替用ヘルパー
    function setActiveButton(clickedBtn) {
        tagContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
    }

    // 5. 初期表示（すべての記事を出力）
    renderArticles(categoryArticles);
}