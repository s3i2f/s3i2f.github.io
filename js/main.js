//////////////////////////////
//【ページネーション生成機能】
//////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    try {
        // 1. ページ内に表示先コンテナが存在するか確認（トップページなどではここで処理終了）
        const container = document.getElementById("pagination-container");
        if (!container) return;

        // 2. site-data.js が正しく読み込まれているか、articles配列が存在するか確認
        if (typeof siteData === 'undefined' || !siteData.articles) {
            console.warn("ページネーション: siteData または siteData.articles が読み込まれていません。");
            return;
        }

        const currentPath = window.location.pathname;

        // 3. siteData.articles の中から現在の記事を取得
        const currentArticle = siteData.articles.find(article => currentPath.includes(article.url));
        if (!currentArticle) return; // site-data.jsに未登録の記事ページなら処理終了

        // 4. 同じカテゴリの記事だけを抽出
        const categoryData = siteData.articles.filter(article => article.category === currentArticle.category);

        // 5. 絞り込んだカテゴリ配列の中での現在記事のインデックスを取得
        const currentIndex = categoryData.findIndex(article => article.url === currentArticle.url);
        if (currentIndex === -1) return;

        // 6. 同カテゴリ内での前後の記事を取得（配列の上が最新）
        const newerArticle = currentIndex > 0 ? categoryData[currentIndex - 1] : null;
        const olderArticle = currentIndex < categoryData.length - 1 ? categoryData[currentIndex + 1] : null;

        // 7. HTMLを生成して挿入
        let html = '';

        // 前の記事（古い記事）へのリンク：[ ＜ ] [ 前へ / タイトル ]
        if (olderArticle) {
            html += `
            <a href="${olderArticle.url}" class="page-prev">
                <span class="nav-arrow">&lt;</span>
                <span class="nav-content">
                    <span class="nav-label">前へ</span>
                    <span class="nav-title">${olderArticle.title}</span>
                </span>
            </a>`;
        } else {
            html += `<span class="page-prev empty"></span>`;
        }

        // 次の記事（新しい記事）へのリンク：[ 次へ / タイトル ] [ ＞ ]
        if (newerArticle) {
            html += `
            <a href="${newerArticle.url}" class="page-next">
                <span class="nav-content">
                    <span class="nav-label">次へ</span>
                    <span class="nav-title">${newerArticle.title}</span>
                </span>
                <span class="nav-arrow">&gt;</span>
            </a>`;
        } else {
            html += `<span class="page-next empty"></span>`;
        }

        container.innerHTML = html;

    } catch (error) {
        // 万が一予期せぬエラーが起きても、ここでエラーを吸収し、他の処理（目次生成など）を止めない
        console.error("ページネーションの生成中にエラーが発生しました:", error);
    }
});



///////////////////////////////
// 【パンくずリスト生成機能】
///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    try {
        // 1. ページ内に表示先コンテナが存在するか確認（トップページなどではここで処理終了）
        const breadcrumbs = document.getElementById('breadcrumbs');
        if (!breadcrumbs) return;

        // 2. URLのパスから配列を生成
        const pathArray = window.location.pathname.split('/').filter(p => p !== "" && p !== "index.html");

        let html = '<a href="/">ホーム</a>';
        let currentPath = '';

        // 3. パス名と表示名のマッピング
        const nameMap = {
            "essay": "Essay",
            "note": "雑記",
            "sampo": "散歩日記",
            "review": "Review",
            "work": "Work",
            "tanka": "短歌"
        };

        // 4. ページタイトルを取得
        const pageTitle = document.title.split('|')[0].trim();

        // 5. HTML文字列を生成
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

        // 6. 生成したHTMLを挿入
        breadcrumbs.innerHTML = html;

    } catch (error) {
        // エラーが発生しても他のスクリプト（ページネーションなど）を止めない
        console.error("パンくずリストの生成中にエラーが発生しました:", error);
    }
});

// ==========================================
// 　【日付を表示】
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    try {
        const dateContainer = document.getElementById("article-date");

        // 要素が存在しないページでは安全に終了
        if (!dateContainer) return;

        // データの存在チェック
        if (typeof siteData === "undefined" || !siteData.articles) {
            console.warn("siteData is undefined or missing articles array.");
            return;
        }

        const currentPath = window.location.pathname;

        // 現在のページに該当する記事データを検索
        const currentArticle = siteData.articles.find(article => {
            if (!article.url) return false;
            // URLの先頭の '/' を削除して比較し、ルート相対・絶対パスの違いを吸収
            const normalizedUrl = article.url.replace(/^\//, '');
            return currentPath.endsWith(normalizedUrl);
        });

        // 該当記事があり、日付データが存在すれば表示
        if (currentArticle && currentArticle.date) {
            dateContainer.textContent = currentArticle.date;
        }
    } catch (error) {
        // エラーハンドリング（他のスクリプトを止めない）
        console.error("Error displaying article date:", error);
    }
});


// ==========================================
// 【カテゴリページの記事一覧 ＆ 親カテゴリピックアップ】
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    try {
        // データの存在チェック
        if (typeof siteData === "undefined" || !siteData.articles) {
            console.warn("siteData is undefined or missing articles array.");
            return;
        }

        const listContainer = document.getElementById("category-article-list"); // 子カテゴリ用
        const pickupContainer = document.getElementById("parent-category-pickup"); // 親カテゴリ用

        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        const currentParts = currentDir.split('/').filter(Boolean);

        // --------------------------------------------------
        // パターンA: 親カテゴリページのピックアップ表示
        // --------------------------------------------------
        if (pickupContainer) {
            // 現在のディレクトリ配下の記事を取得（index.htmlは除外）
            const parentArticles = siteData.articles.filter(article => {
                if (!article.url || article.url.endsWith('index.html')) return false;
                const aUrl = article.url.startsWith('/') ? article.url : '/' + article.url;
                return aUrl.startsWith(currentDir);
            });

            // 子カテゴリ（article.category）ごとにグループ化
            const grouped = {};
            parentArticles.forEach(article => {
                const catId = article.category;
                if (!catId) return;
                if (!grouped[catId]) grouped[catId] = [];
                grouped[catId].push(article);
            });

            const fragment = document.createDocumentFragment();

            // グループごとにHTMLを生成
            for (const [catId, articles] of Object.entries(grouped)) {
                // 最新3件に絞る
                const topArticles = articles.slice(0, 3);
                if (topArticles.length === 0) continue;

                // カテゴリ情報の取得（定義がない場合のフォールバックも用意）
                const catMeta = (siteData.categories && siteData.categories[catId])
                    ? siteData.categories[catId]
                    : { name: catId, url: currentDir + catId + '/' };

                // セクションのラッパー作成
                const section = document.createElement("section");
                section.className = "category-pickup-section";

                // 見出し
                const h2 = document.createElement("h2");
                h2.innerHTML = `<a href="${catMeta.url}">${catMeta.name}</a>`;
                section.appendChild(h2);

                // カテゴリの説明文 (descriptionがあればpタグで追加)
                if (catMeta.description) {
                    const desc = document.createElement("p");
                    desc.className = "category-pickup-desc";
                    desc.textContent = catMeta.description;
                    section.appendChild(desc);
                }

                // 記事リスト
                const ul = document.createElement("ul");
                topArticles.forEach(article => {
                    const li = document.createElement("li");
                    const aUrl = article.url.startsWith('/') ? article.url : '/' + article.url;
                    li.innerHTML = `<a href="${aUrl}"><span class="article-list-date">${article.date}</span> <span class="article-list-title">${article.title}</span></a>`;
                    ul.appendChild(li);
                });
                section.appendChild(ul);

                // 「もっと見る」リンク
                const moreLink = document.createElement("div");
                moreLink.className = "category-pickup-more";
                moreLink.innerHTML = `<a href="${catMeta.url}">もっと見る &raquo;</a>`;
                section.appendChild(moreLink);

                fragment.appendChild(section);
            }

            if (fragment.childNodes.length === 0) {
                pickupContainer.innerHTML = "<p>記事がありません。</p>";
            } else {
                pickupContainer.appendChild(fragment);
            }
        }

        // --------------------------------------------------
        // パターンB: 子カテゴリページの一覧表示（既存のロジック）
        // --------------------------------------------------
        if (listContainer) {
            const categoryArticles = siteData.articles.filter(article => {
                if (!article.url) return false;
                const aUrl = article.url.startsWith('/') ? article.url : '/' + article.url;
                if (aUrl.endsWith('index.html')) return false;

                const articleDir = aUrl.substring(0, aUrl.lastIndexOf('/') + 1);
                const articleParts = articleDir.split('/').filter(Boolean);

                if (articleParts.length === 0) return false;

                let isCategoryMatch = false;
                for (let i = 0; i < currentParts.length; i++) {
                    const pathSub = currentParts.slice(i);
                    let isPrefix = true;
                    for (let j = 0; j < pathSub.length; j++) {
                        if (pathSub[j] !== articleParts[j]) {
                            isPrefix = false;
                            break;
                        }
                    }
                    if (isPrefix) {
                        isCategoryMatch = true;
                        break;
                    }
                }
                return isCategoryMatch;
            });

            if (categoryArticles.length === 0) {
                listContainer.innerHTML = "<li>このカテゴリにはまだ記事がありません。</li>";
                return;
            }

            const fragment = document.createDocumentFragment();
            categoryArticles.forEach(article => {
                const li = document.createElement("li");
                const aUrl = article.url.startsWith('/') ? article.url : '/' + article.url;
                li.innerHTML = `<a href="${aUrl}"><span class="article-list-date">${article.date}</span> <span class="article-list-title">${article.title}</span></a>`;
                fragment.appendChild(li);
            });
            listContainer.appendChild(fragment);
        }

    } catch (error) {
        console.error("Error generating category article list:", error);
    }
});